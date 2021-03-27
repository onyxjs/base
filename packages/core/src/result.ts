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
  private internalStatus: Status
  private internalMessages: string[]

  constructor(status?: Status, messages: string | string[] = []) {
    this.internalStatus = status || Status.Pending
    if (!Array.isArray(messages)) {
      messages = [ messages ]
    }
    this.internalMessages = messages
  }

  /**
   * @description Checks if the internal status is 'Pending' or 'Running'.
   */
  public isDone() {
    return this.internalStatus !== Status.Pending && this.internalStatus !== Status.Running
  }

  /**
   * @description Gets the internal status on the current `Result` instance.
   */
  public get status() {
    return this.internalStatus
  }

  /**
   * @description Sets the internal status on the current `Result` instance.
   */
  public set status(v: Status) {
    if (this.isDone()) { return }
    this.internalStatus = v
  }

  /**
   * @description Gets the internal messages on the current `Result` instance.
   */
  public get messages() {
    return this.internalMessages
  }

  /**
   * @description Adds messages to the internal messages if the `Runnable` has not completed.
   */
  public addMessages(...messages: string[]) {
    if (this.isDone()) { return }
    this.internalMessages.push(...messages)
  }
}
