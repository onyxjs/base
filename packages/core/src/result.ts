export enum Status {
  Failed = 'FAILED',
  Passed = 'PASSED',
  Skipped = 'SKIPPED',
}

export default class Result {
  public status: string;
  public messages: string[];

  constructor(status: string, messages: string[]) {
    this.status = status;
    this.messages = messages;
  }
}
