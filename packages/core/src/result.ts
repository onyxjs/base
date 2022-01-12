// import { RunnableTypes } from "."\


// export enum Status {
//   Pending = 'pending',
//   Running = 'running',
//   Passed = 'passed',
//   Failed = 'failed',
//   Skipped = 'skipped',
//   Todo = 'todo',
// }

// Types
import { BailError } from './BailError'
import { TimeoutError } from './TimeoutError'
import { RunnableTypes, Status } from './types'
type ResultOptions<T extends RunnableTypes> = {
  description: string
  time: number
  type: T
}

type RunnableError = Error | TimeoutError | BailError

/**
 * @todo Delete messages.
 */
class Result<T extends RunnableTypes> {
  private _internalErrors: Error[]
  private _internalStatus: Status
  private _internalMessages: string[]

  public time: number
  public description: string
  public type: T

  constructor(messages: string | string[] = [], options: ResultOptions<T>, errors: RunnableError[] | RunnableError = [], status?: Status) {
    this._internalErrors = !Array.isArray(errors) ? [ errors ] : errors
    this._internalStatus = status || Status.Pending
    this._internalMessages = !Array.isArray(messages) ? [ messages ] : messages
    
    this.description = options.description
    this.time = options.time
    this.type = options.type
  }

  /**
   * @description Checks if the internal status is 'Pending' or 'Running'.
   */
  public isDone(): boolean {
    return this._internalStatus !== Status.Pending && this._internalStatus !== Status.Running
  }

  public get errors(): Array<Error> {
    return this._internalErrors
  }

  /**
   * @description Gets the internal status on the current `Result` instance.
   */
  public get status(): Status {
    return this._internalStatus
  }

  /**
   * @description Sets the internal status on the current `Result` instance.
   */
  public set status(v: Status) {
    if (this.isDone()) { return }
    this._internalStatus = v
  }

  /**
   * @description Gets the internal messages on the current `Result` instance.
   */
  public get messages(): string[] {
    return this._internalMessages
  }

  /**
   * @description Adds messages to the internal messages if the `Runnable` has not completed.
   */
  public addMessages(...messages: string[]): void {
    if (this.isDone()) { return }
    this._internalMessages = [...this._internalMessages, ...messages]
  }

  public addErrors(...errors: Error[]): void {
    if (this.isDone()) { return }
    this.addMessages(...errors.map((e) => e.message))
    this._internalErrors = [...this._internalErrors, ...errors]
  }
}

export function createResult<T extends RunnableTypes>(options: ResultOptions<T>, messages: string | string[] = [], errors: RunnableError[] | RunnableError = [], status?: Status): Result<T> {
  return new Result(messages, options, errors, status)
}

export default Result
