export enum Status {
  Failed,
  Passed,
  Skipped,
}

export default class Result {
  public status: Status;
  public messages: string[];

  constructor(status: Status, messages: string | string[]) {
    this.status = status;
    if (!Array.isArray(messages)) {
      messages = [ messages ];
    }
    this.messages = messages;
  }
}
