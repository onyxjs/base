// import { RunStatus } from './newResult'
import Runnable/*, { RunnableOptions, RunnableResult, RunnableTypes }*/ from './runnable'
// import { RunOptions } from './runner'
import type Suite from './suite'
import { TimeoutError } from './TimeoutError'

// Types
import { RunnableOptions, RunOptions, RunnableResult, RunStatus, RunnableTypes, TestFn } from './types'

// export type TestFn = () => (void | Promise<any>)

/**
 * @description Checks if the passed `Runnable` value is a `Test` instance.
 */
export const isTest = (v: unknown): v is Test => v instanceof Test

export default class Test extends Runnable {
  public fn: TestFn
  public type: RunnableTypes.Test = RunnableTypes.Test

  /* istanbul ignore next */
  constructor(description: string, fn: TestFn, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    super(description, options, parent)
    this.fn = fn
    this.parent = parent
  }

  private async _timeout<T extends TestFn>(
    promise: T,
    ms: number,
    timeoutError = new TimeoutError(`${this.getFullDescription()} has timed out: ${ms}ms`)
  ): Promise<T | void> {
    let timer: NodeJS.Timeout
  
    // create a promise that rejects in milliseconds
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        reject(timeoutError)
      }, ms)
    })
  
    // returns a race between timeout and the passed promise
    return await Promise.race<T | void>([promise(), timeout]).finally(() => clearTimeout(timer))
  }

  /**
   * @description Run a `Test` instance.
   */
  public async run(options?: Partial<RunOptions>): Promise<RunnableResult> {
    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo ? RunStatus.TODO : RunStatus.SKIPPED)
    }

    this.doStart()

    try {
      const result = options && options.timeout ? await this._timeout(this.fn, options.timeout) : await this.fn()

      return this.doPass()
    } catch (error: any) {
      return this.doFail(error)
    }
  }
}
