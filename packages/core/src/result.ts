export enum Status {
  Passed,
  Failed,
  Errored,
  Skipped,
  Pending,
}

export default class Result {
  private _status: Status;
  private _messages: string[];

  constructor(status?: Status, messages: string | string[] = []) {
    this._status = status || Status.Pending;
    if (!Array.isArray(messages)) {
      messages = [ messages ];
    }
    this._messages = messages;
  }

  public isDone() {
    return this._status !== Status.Pending;
  }

  public get status() {
    return this._status;
  }
  public set status(v: Status) {
    if (this.isDone()) return;
    this._status = v;
  }

  public get messages() {
    return this._messages;
  }
  // No ability to delete messages
  public addMessages(...messages: string[]) {
    if (this.isDone()) return;
    this._messages.push(...messages);
  }
}
