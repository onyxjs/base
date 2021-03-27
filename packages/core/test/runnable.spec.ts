import { Status } from '../src/result'
import Runnable, { RunnableOptions, RunnableTypes } from '../src/runnable'
import Suite, { rootSymbol } from '../src/suite'
import { TestFn } from '../src/test'

class TestRunnable extends Runnable {
  public fn: TestFn
  public type: RunnableTypes.Test = RunnableTypes.Test

  constructor(description: string, fn: TestFn, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    super(description, options, parent)
    this.fn = fn
    this.parent = parent
  }

  async run(): Promise<void> {
    // no-op
  }
}

const noop = () => { /*no-op*/ }

describe('Runnable', () => {
  const defaultOpts = { skip: false, todo: false }
  const defaultSuiteOpts = { skip: false, todo: false }

  it('should be extendable', () => {
    class ExtendedRunnable extends Runnable {
      run() { /* no-op */}
    }

    const v = new ExtendedRunnable('runnable', {}, null)
    expect(v).toBeInstanceOf(Runnable)
  })

  it('should emit')

  it('should get full description', () => {
    const parent = new Suite('parent', defaultSuiteOpts, null)
    const child = new TestRunnable('child', noop, defaultOpts, parent)

    expect(child.getFullDescription()).toBe('parent -> child')
  })

  it('should ignore root in full description', () => {
    const parent = new Suite('parent', defaultSuiteOpts, null)
    parent[rootSymbol] = true
    const child = new TestRunnable('child', noop, defaultOpts, parent)
    expect(child.getFullDescription()).toBe('child')
  })
  
  describe('events', () => {
    it('start', () => {
      const runnable = new TestRunnable('runnable', noop, defaultOpts, null)

      const fn = jest.fn()
      runnable.on('start', fn)

      runnable.doStart()
      expect(runnable.result.status).toBe(Status.Running)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('pass', () => {
      const runnable = new TestRunnable('runnable', noop, defaultOpts, null)
      const fn = jest.fn()
      runnable.on('pass', fn)

      const end = jest.fn()
      runnable.on('end', end)

      runnable.doPass()
      expect(runnable.result.status).toBe(Status.Passed)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(end).toHaveBeenCalledTimes(1)
    })

    it('fail', () => {
      const runnable = new TestRunnable('runnable', noop, defaultOpts, null)
      const fn = jest.fn()
      runnable.on('fail', fn)

      const end = jest.fn()
      runnable.on('end', end)

      runnable.doFail()
      expect(runnable.result.status).toBe(Status.Failed)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(end).toHaveBeenCalledTimes(1)
    })

    it('skip', () => {
      const runnable = new TestRunnable('runnable', noop, defaultOpts, null)
      const fn = jest.fn()
      runnable.on('skip', fn)

      const end = jest.fn()
      runnable.on('end', end)
      const skip = jest.fn()
      runnable.on('skip', skip)

      runnable.doSkip()
      expect(runnable.result.status).toBe(Status.Skipped)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(end).toHaveBeenCalledTimes(1)
      expect(skip).toHaveBeenCalledWith(runnable, false)
      expect(runnable.time).toBe(0)
    })

    it('skip(todo)', () => {
      const runnable = new TestRunnable('runnable', noop, defaultOpts, null)
      const fn = jest.fn()
      runnable.on('skip', fn)

      const end = jest.fn()
      runnable.on('end', end)
      const skip = jest.fn()
      runnable.on('skip', skip)

      runnable.doSkip(true)
      expect(runnable.result.status).toBe(Status.Todo)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(end).toHaveBeenCalledTimes(1)
      expect(skip).toHaveBeenCalledWith(runnable, true)
      expect(runnable.time).toBe(0)
    })

    it('end', () => {
      const runnable = new TestRunnable('runnable', noop, defaultOpts, null)
      const end = jest.fn()
      runnable.on('end', end)

      runnable.doEnd()
      expect(end).toHaveBeenCalledTimes(1)
    })
  })
})
