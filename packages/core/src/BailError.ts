export class BailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BailError'
  }
}

function createBailError(message: string): BailError {
  return new BailError(message)
}
