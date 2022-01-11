import { HookName, Hooks } from './hooks'
import Runnable, { isRunnable/*, RunnableOptions, RunnableResult, RunnableTypes*/ } from './runnable'
import Result from './result'

// Utilities
import { BailError } from './BailError'
import { normalizeRunOptions } from './utils'

// Types
import { RunnableOptions, RunOptions, RunnableResult, RunnableTypes, RunStatus, SuiteStats, Status } from './types'

/**
 * @description Checks if passed value is a `Runnable` instance of type `Suite`.
 */
const isSuite = (v: unknown): v is Suite => {
  if (!isRunnable(v)) { return false }
  else return v.type === RunnableTypes.Suite
}

const rootSymbol = Symbol('isRoot')

// export interface SuiteStats {
//   total: number
//   pending: number
//   running: number
//   done: number
//   passed: number
//   failed: number
//   skipped: number
//   todo: number
//   time: number
// }
export default class Suite extends Runnable {
  public children: Runnable[]
  public [rootSymbol]?: boolean
  public type = RunnableTypes.Suite
  public options: RunnableOptions
  public hooks: Hooks
  private _failed: number

  /* istanbul ignore next */
  constructor(description: string, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    super(description, options, parent)
    this.options = {
      ...Runnable.normalizeOptions(options),
    }
    this.children = []

    this.hooks = {
      afterAll: [],
      afterEach: [],
      beforeAll: [],
      beforeEach: [],
    }
    this._failed = 0
  }
  
  private async _parallel(children: Array<Promise<void | RunnableResult | Result>>, bail?: boolean): Promise<RunnableResult | undefined> {
    try {
      await Promise.all<Promise<void | RunnableResult | Result>>(
        children.map(async (promise) => {
          const result = await promise

          if (bail && result) return this.doFail(new BailError(result.messages[0]))
          return result
        })
      )
    } catch (error: any) {
      await this.invokeHook('afterAll')
      return this.doFail(error)
    }
  }

  private async _sequential(children: Array<Promise<void | RunnableResult | Result>>, bail?: boolean): Promise<RunnableResult | undefined> {
    for (const promise of children) {
      try {
        const result = await promise
        
        if (bail && result) return this.doFail(new BailError(result.messages[0]))
      } catch (error: any) {
        return this.doFail(error)
      }
    }
  }

  private _wrapChildren(children: Runnable[]): Array<Promise<void | Result | RunnableResult>> {
    return children.map((child: Runnable) => {
      return (async () => {
        await this.invokeHook('beforeEach')
        const result = await child.run()
        this.result.messages = [...this.result.messages, ...result.messages.map((msg) => `${child.description}: ${msg}`)]
        await this.invokeHook('afterEach')
        return result
      })()
    })
  }

  /**
   * @description Runs functions associated with the passed `HookName`.
   */
  public async invokeHook(name: HookName) {
    const hook = this.hooks[name]
    for (const fn of hook) {
      try {
        await fn()
      } catch (err) {
        console.error(`Error in ${name} hook: ${err}`)
      }
    }
  }

  /**
   * @description Add one or more child `Runnable` instances.
   */
  public addChildren(...children: Runnable[]): void {
    for (const child of children) {
      child.parent = this
    }
    this.children = [...this.children, ...children]
  }

  /**
   * @description Check that `Suite` is the root suite.
   */
  public isRoot(): boolean {
    return Boolean(this[rootSymbol])
  }

  /**
   * @description Runs a `Suite` instance.
   */
  public async run(options?: Partial<RunOptions>): Promise<Result | RunnableResult> {
    options = normalizeRunOptions(options)

    if (this.options.skip || this.options.todo) return this.doSkip(this.options.skip ? RunStatus.SKIPPED : RunStatus.TODO)

    this.doStart()
    await this.invokeHook('beforeAll')

    const promisifiedChildren = this._wrapChildren(this.children)

    if (options.sequential) await this._sequential(promisifiedChildren, options.bail) 
    else await this._parallel(promisifiedChildren, options.bail)

    await this.invokeHook('afterAll')
    if (this._failed) return this.doFail(new Error(`${this.description} ${Status.Failed}`))
    else return this.doPass()
  }

  /**
   * @description Collects the stats of all children on the current `Suite` instance.
   */
  public getStats(): SuiteStats {
    const childrenList = this.flatten(this.children)
    return {
      done: childrenList.filter((c) => c.isDone()).length,
      failed: childrenList.filter((c) => c.result.status === RunStatus.FAILED).length,
      passed: childrenList.filter((c) => c.result.status === RunStatus.PASSED).length,
      pending: childrenList.filter((c) => c.result.status === RunStatus.PENDING).length,
      running: childrenList.filter((c) => c.result.status === RunStatus.RUNNING).length,
      skipped: childrenList.filter((c) => c.result.status === RunStatus.SKIPPED).length,
      time: this.time,
      todo: childrenList.filter((c) => c.result.status === RunStatus.TODO).length,
      total: childrenList.length,
    }
  }

  /**
   * @description Recursively creates a new array with all sub-array children added.
   */
  private flatten(array: Runnable[]): Runnable[] {
    const flatTree: Runnable[] = []
    for (const child of array) {
      if ((isSuite(child))) {
        flatTree.push(...this.flatten(child.children))
        continue
      }
      flatTree.push(child)
    }

    return flatTree
  }
}

// export {
//   // isSuite,
//   rootSymbol,
// }
