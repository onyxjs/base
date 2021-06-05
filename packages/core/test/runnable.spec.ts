import { RunStatus } from '../src/newResult'
import { Status } from '../src/result'
import Runnable, { isRunnable, RunnableTypes } from '../src/runnable'
import Suite, { rootSymbol } from '../src/suite'

class OnyxRunnable extends Runnable {
  async run(shouldThrow = false) {
    try {
      if (shouldThrow) throw new Error('thrown')

      if (this.options.skip || this.options.todo) {
        return Promise.resolve(this.doSkip(this.options.skip ? RunStatus.SKIPPED : RunStatus.TODO))
      }
      
      await this.doStart()

      return Promise.resolve(this.doPass())
    } catch(err) {
      return Promise.resolve(this.doFail(err))
    }
  }
}

describe('Runnable', () => {
  const defaultOpts = { skip: false, todo: false }
  const defaultSuiteOpts = { skip: false, todo: false }
  let parentSuite: Suite
  let runnable: OnyxRunnable

  beforeEach(() => {
    parentSuite = new Suite('parent', defaultSuiteOpts, null)
    runnable = new OnyxRunnable('runnable', defaultOpts, parentSuite)
  })

  it('should update the result description and fullDescription when instaniated', () => {
    expect(runnable.result.description).toBe('runnable')
    expect(runnable.result.fullDescription).toBe('parent -> runnable')
  })

  it('should get full description', () => {
    expect(runnable.getFullDescription()).toBe('parent -> runnable')
  })

  it('doStart()', () => {
    runnable.doStart()
    expect(runnable.start).not.toBe(0)
    expect(runnable.result.status).toBe(RunStatus.RUNNING)
  })

  it('doEnd()', () => {
    runnable.doEnd()
    expect(runnable.result.time).not.toBe(0)
  })

  it('should ignore root in full description', () => {
    parentSuite[rootSymbol] = true
    expect(runnable.getFullDescription()).toBe('runnable')
  })

  it('should return a passing result', async () => {
    const result = await runnable.run()
    expect(result.status).toBe(RunStatus.PASSED)
  })

  it('should return a failing result', async () => {
    const result = await runnable.run(true)
    expect(result.status).toBe(RunStatus.FAILED)
    expect(result.failures[0].message).toBe('thrown')
  })

  it('should return a skipped result', async () => {
    runnable.options.skip = true

    const result = await runnable.run()
    expect(result.status).toBe(RunStatus.SKIPPED)
  })

  it('should return a todo result', async () => {
    runnable.options.todo = true

    const result = await runnable.run()
    expect(result.status).toBe(RunStatus.TODO)
  })

  it('should return whether the runnable has finished', async () => {
    expect(runnable.isDone()).toBe(false)

    await runnable.run()

    expect(runnable.isDone()).toBe(true)
  })

  describe('isRunnable type guard', () => {
    it ('should return false if not a valid Runnable', () => {
        expect(isRunnable(null)).toBe(false)
        expect(isRunnable('')).toBe(false)
        expect(isRunnable(runnable)).toBe(true)
    })
  })
})
