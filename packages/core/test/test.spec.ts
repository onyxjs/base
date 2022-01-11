// import { Status } from '../src/result'
import { Test as OnyxTest, Suite as OnyxSuite, isTest } from '../src'
// import { RunStatus } from '../src/newResult'
import { TimeoutError } from '../src/TimeoutError'

// Types
import { RunStatus, Status } from '../src/types'

describe('Test', () => {
  const defaultOpts = { skip: false, todo: false }

  it('should timeout', async () => {
    jest.useRealTimers()

    // fn function should not resolve before the timeout promise
    const fn = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve('Shouldn\'t resolve first')
      }, 1500)
    })

    const onyxTest = new OnyxTest('test timeout', fn, defaultOpts, null)

    const timeoutResult = await onyxTest.run({ timeout:  1000 })

    expect(timeoutResult.status).toBe(RunStatus.FAILED)
    expect(timeoutResult.failures[0]).toStrictEqual(new TimeoutError(`${onyxTest.description} has timed out: 1000ms`))

    jest.clearAllTimers()
  })

  it('should return isDone', async () => {
    const fn = jest.fn()
    const onyxTest = new OnyxTest('test isDone', fn, defaultOpts, null)

    expect(onyxTest.isDone()).toBeFalsy()
    await onyxTest.run()
    expect(onyxTest.isDone()).toBeTruthy()
  })

  it('should check if is test', () => {
    const fn = jest.fn()

    expect(isTest(null)).toBeFalsy()
    expect(isTest({})).toBeFalsy()
    expect(isTest(new OnyxSuite('not a test', defaultOpts, null))).toBeFalsy()
    expect(isTest(new OnyxTest('a test', fn, defaultOpts, null))).toBeTruthy()
  })

  it('should run', async () => {
    const fn = jest.fn()
    const onyxTest = new OnyxTest('test run', fn, defaultOpts, null)

    expect(fn).toHaveBeenCalledTimes(0)
    expect(await (await onyxTest.run()).status).toBe(Status.Passed)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should fail', async () => {
    const err = new Error('Fatal error')
    const fn = () => {
      throw err
    }
    const onyxTest = new OnyxTest('test fail', fn, defaultOpts, null)
    const result = await onyxTest.run()
    expect(result.status).toBe(Status.Failed)
    expect(result.failures[0]).toStrictEqual(new Error('Fatal error'))
  })

  it('should skip', async () => {
    const onyxTest = new OnyxTest('test skip', jest.fn(), { skip: true, todo: false}, null)

    expect((await onyxTest.run()).status).toBe('skipped')
  })
})
