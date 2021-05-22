import Result from './result'
import Runnable, { isRunnable, RunnableOptions, RunnableTypes } from './runnable'
import { RunOptions } from './runner'
import Suite from './suite'

export type TestFn = () => (void | Promise<any>) 

/**
 * @description Checks if the passed `Runnable` value is a `Test` instance.
 */
export const isTest = (v: unknown): v is Test => {
  if (!isRunnable(v)) { return false }
  return v.type === RunnableTypes.Test
}

export default class Test extends Runnable {
  public fn: TestFn
  public type: RunnableTypes.Test = RunnableTypes.Test

  /* istanbul ignore next */
  constructor(description: string, fn: TestFn, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    super(description, options, parent)
    this.fn = fn
    this.parent = parent
  }

  /**
   * @description Run a `Test` instance.
   */
  public async run(options?: Partial<RunOptions>): Promise<Result> {
    if (this.options.skip || this.options.todo) {
      return this.doSkip(this.options.todo)
    }

    this.doStart()

    if (options && options.timeout) {
      let timer: NodeJS.Timeout
      const wait = (ms: number) => new Promise(resolve => {
        timer = setTimeout(resolve, ms)
      }) 

      const test = Promise.race([
        wait(options.timeout).then(() => {
          clearTimeout(timer)
          throw new Error(`${this.getFullDescription()} has timed out: ${options.timeout}ms`)
        }),
        this.fn(),
      ])

      try {
        await test
      } catch (error) {
        return this.doFail(error)
      }

      return this.doPass()
    } else {
      try {
        await this.fn()
      } catch (error) {
        return this.doFail(error)
      }

      return this.doPass()
    }
  }
}
