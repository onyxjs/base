import { RunStatus } from '../src/newResult'
import { Status } from '../src/result'
import Runnable, { isRunnable, RunnableTypes } from '../src/runnable'
import Suite, { rootSymbol } from '../src/suite'

class OnyxRunnable extends Runnable {
  async run() {
    try {
      if (this.options.skip || this.options.todo) {
        return Promise.resolve(this.doSkip(true))
      }
      
      await this.doStart()

      return Promise.resolve(this.doPass())
    } catch(err) {
      return Promise.reject(this.doFail(err))
    }
  }
}

describe('Runnable', () => {
  const defaultOpts = { skip: false, todo: false }
  const defaultSuiteOpts = { skip: false, todo: false }
  let parentSuite: Suite
  let runnable: Runnable

  beforeAll(() => {
    parentSuite = new Suite('parent', defaultSuiteOpts, null)
    runnable = new OnyxRunnable('runnable', defaultOpts, parentSuite)
  })

  it('should get full description', () => {
    expect(runnable.getFullDescription()).toBe('parent -> runnable')
  })

  it('doStart()', () => {
    runnable.doStart()
    expect(runnable.start).not.toBe(0)
    expect(runnable.result.status).toBe(RunStatus.RUNNING)
  })

  it('should ignore root in full description', () => {
    parentSuite[rootSymbol] = true

    expect(runnable.getFullDescription()).toBe('runnable')
  })

  describe('isRunnable type guard', () => {
    it ('should return false if not a valid Runnable', () => {
        expect(isRunnable(null)).toBe(false)
        expect(isRunnable('')).toBe(false)
        expect(isRunnable(runnable)).toBe(true)
    })
  })
})
