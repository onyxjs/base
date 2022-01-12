import Result, { createResult } from '../src/result'
import { RunnableTypes, Status } from '../src/types'

describe('Result', () => {
  let result: Result<RunnableTypes.Runnable>

  beforeEach(() => {
    result = createResult({ description: 'testResult', time: 0, type: RunnableTypes.Runnable })
  })

  it('should change status', () => {
    expect(result.status).toBe(Status.Pending)
    result.status = Status.Passed
    expect(result.status).toBe(Status.Passed)
  })

  it('should set isDone', () => {
    expect(result.isDone()).toBeFalsy()
    result.status = Status.Passed
    expect(result.isDone()).toBeTruthy()
  })

  it('should work with messages', () => {
    expect(result.messages).toStrictEqual([])
    result.addMessages('Test', 'Onyx')
    expect(result.messages).toHaveLength(2)
  })

  it('should lock up when done', () => {
    result.addMessages('Test', 'Onyx')
    expect(result.messages).toHaveLength(2)

    result.status = Status.Passed

    result.addMessages('Test', 'Onyx')
    expect(result.messages).toHaveLength(2)

    result.status = Status.Pending
    expect(result.status).toBe(Status.Passed)
  })
})
