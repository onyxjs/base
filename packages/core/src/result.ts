import { RunnableTypes } from "."

export enum Status {
  Pending = 'pending',
  Running = 'running',
  Passed = 'passed',
  Failed = 'failed',
  Skipped = 'skipped',
  Todo = 'todo',
}

/**
 * @todo Delete messages.
 */
export default class Result {
  private _internalErrors: Error[]
  private _internalStatus: Status
  private _internalMessages: string[]
  
  public time: number
  public title: string
  public description: string
  public filePath: string
  public type: RunnableTypes

  constructor(messages: string | string[] = [], options: Result, errors: Error[] | Error = [], status?: Status) {
    this._internalErrors = !Array.isArray(errors) ? [ errors ] : errors
    this._internalStatus = status || Status.Pending
    this._internalMessages = !Array.isArray(messages) ? [ messages ] : messages
    
    this.description = options.description
    this.filePath = options.filePath
    this.time = options.time
    this.title = options.title
    this.type = options.type
  }

  /**
   * @description Checks if the internal status is 'Pending' or 'Running'.
   */
  public isDone() {
    return this._internalStatus !== Status.Pending && this._internalStatus !== Status.Running
  }

  public get errors() {
    return this._internalErrors
  }

  /**
   * @description Gets the internal status on the current `Result` instance.
   */
  public get status() {
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
  public get messages() {
    return this._internalMessages
  }

  /**
   * @description Adds messages to the internal messages if the `Runnable` has not completed.
   */
  public addMessages(...messages: string[]) {
    if (this.isDone()) { return }
    this._internalMessages.push(...messages)
  }

  public addErrors(...errors: Error[]) {
    this._internalErrors = [ ...this._internalErrors, ...errors ]
  }
}
