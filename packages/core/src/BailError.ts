export class BailError extends Error {
  /* istanbul ignore next */
  constructor(message: string) {
    super(message)
    this.name = 'BailError'
  }
}
