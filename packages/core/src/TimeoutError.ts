export class TimeoutError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'TimeoutError'
  }
}

function createTimeoutError(message: string): TimeoutError {
  return new TimeoutError(message)
}
