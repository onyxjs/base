import { Status } from '.'
import { RunStatus } from './newResult'
import Runnable, { RunnableOptions, RunnableResult, RunnableTypes } from './runnable'
import { RunOptions } from './runner'
import Suite from './suite'

export type TestFn = () => (void | Promise<any>)
// const TimeoutError = Symbol('TimeoutError')

export class TimeoutError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'TimeoutError'
  }
}

function promiseWithTimeout<T extends TestFn>(
  promise: T,
  ms: number,
  timeoutError = new TimeoutError('Promise timed out')
) {
  let timer: NodeJS.Timeout

  // create a promise that rejects in milliseconds
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(timeoutError)
    }, ms)
  })

  // returns a race between timeout and the passed promise
  return Promise.race<T | void>([promise(), timeout]).finally(() => clearTimeout(timer))
}

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
      // const result = options && options.timeout ? await promiseWithTimeout(this.fn, options.timeout) : this.fn()
      const result = options && options.timeout ? await this._timeout(this.fn, options.timeout) : await this.fn()

      // console.log('result: ', result)

      return this.doPass()
    } catch (error: any) {
      // console.log('error: ', (error as Error))
      // const err = error instanceof TimeoutError || error instanceof Error ? error : new Error(error.message)
      return this.doFail(error)
    }
  }

  // public async run2() {
  //   if (options && options.timeout) {
  //     let timer: NodeJS.Timeout
  //     const wait = (ms: number) => new Promise(resolve => {
  //       timer = setTimeout(resolve, ms)
  //     }) 

  //     const test = Promise.race([
  //       wait(options.timeout).then(() => {
  //         clearTimeout(timer)
  //         throw new Error(`${this.getFullDescription()} has timed out: ${options.timeout}ms`)
  //       }),
  //       this.fn(),
  //     ])

  //     try {
  //       await test
  //     } catch (error) {
  //       return this.doFail(error)
  //     }

  //     return this.doPass()
  //   } else {
  //     try {
  //       await this.fn()
  //     } catch (error) {
  //       return this.doFail(error)
  //     }

  //     return this.doPass()
  //   }
  //   return {} as Promise<RunnableResult>;
  // }
}
