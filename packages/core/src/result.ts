export enum Status {
  Pending,
  Running,
  Passed,
  Failed,
  Skipped,
}

export default class Result {
  private internalStatus: Status;
  private internalMessages: string[];

  constructor(status?: Status, messages: string | string[] = []) {
    this.internalStatus = status || Status.Pending;
    if (!Array.isArray(messages)) {
      messages = [ messages ];
    }
    this.internalMessages = messages;
  }

  public isDone() {
    return this.internalStatus !== Status.Pending && this.internalStatus !== Status.Running;
  }

  public get status() {
    return this.internalStatus;
  }
  public set status(v: Status) {
    if (this.isDone()) { return; }
    this.internalStatus = v;
  }

  public get messages() {
    return this.internalMessages;
  }
  // No ability to delete messages
  public addMessages(...messages: string[]) {
    if (this.isDone()) { return; }
    this.internalMessages.push(...messages);
  }
}
