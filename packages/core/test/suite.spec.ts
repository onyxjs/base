// import { Status } from '../src/result'
// import Runnable from '../src/runnable'
import Suite, { rootSymbol } from '../src/suite'
// import Test from '../src/test'

// Types
// import { Status } from '../src/types'

describe('Suite', () => {
  const defaultOpts = {
    skip: false,
    todo: false,
  }

  it('should check if is root', () => {
      const suite = new Suite('suite', defaultOpts, null)

      expect(suite.isRoot()).toBeFalsy()

      suite[rootSymbol] = true
      expect(suite.isRoot()).toBeTruthy()
  })
  // class PassingRunnable extends Runnable {
  //   public async run() {
  //     this.result.addMessages('OK')
  //     this.result.status = Status.Passed
  //     return this.result
  //   }
  // }

  // it('should pass', async () => {
  //   const child = new Test('child', jest.fn(), defaultOpts, null)
  //   const parent = new Suite('parent', defaultOpts, null)
  //   parent.addChildren(child)

  //   const start = jest.fn()
  //   parent.on('start', start)
  //   const pass = jest.fn()
  //   parent.on('pass', pass)
  //   const end = jest.fn()
  //   parent.on('end', end)

  //   const promise = parent.run()

  //   expect(start).toHaveBeenCalledTimes(1)

  //   expect((await promise).status).toBe(Status.Passed)
  //   expect(pass).toHaveBeenCalledTimes(1)
  //   expect(end).toHaveBeenCalledTimes(1)
  // })

  // it('should run sequentially', async () => {
  //   const suite = new Suite('Suite', defaultOpts, null)
  //   const child = new PassingRunnable('desc', defaultOpts, suite)
  //   const child1 = new PassingRunnable('desc', defaultOpts, suite)
  //   const child2 = new PassingRunnable('desc', defaultOpts, suite)
  //   const child3 = new PassingRunnable('desc', defaultOpts, suite)
  //   const child4 = new PassingRunnable('desc', defaultOpts, suite)
  //   suite.addChildren(child, child1, child2, child3, child4)

  //   await suite.run({ sequential: true })
  //   expect(suite.getStats().done).toBe(5)
  // })

  // it('should fail', async () => {
  //   const fn = jest.fn()

  //   const err = new Error('FAIL!')
  //   const child = new Test('child 1', () => { throw err }, defaultOpts, null)
  //   const passingChild = new Test('child 2', fn, defaultOpts, null)
  //   const parent = new Suite('parent', defaultOpts, null)
  //   parent.addChildren(child)
  //   parent.addChildren(passingChild)

  //   const start = jest.fn()
  //   parent.on('start', start)
  //   const fail = jest.fn()
  //   parent.on('fail', fail)
  //   const end = jest.fn()
  //   parent.on('end', end)

  //   expect((await parent.run()).status).toBe(Status.Failed)

  //   expect(fn).toHaveBeenCalledTimes(1)
  //   expect(start).toHaveBeenCalledTimes(1)
  //   expect(fail).toHaveBeenCalledTimes(1)
  //   expect(end).toHaveBeenCalledTimes(1)
  // })

  // describe('should bail out on first failure', () => {
  //   jest.useRealTimers()

  //   const fn = () => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve('Shouldn\'t resolve')
  //       }, 1500)
  //     })
  //   }

  //   const errorFn = () => {
  //     throw Error()
  //   }

  //   it ('non-sequential', async () => {
  //     // Non-sequential
  //     const parent = new Suite('parent', defaultOpts, null)
  //     const fail = new Test('firstFail', errorFn, defaultOpts, null)
  //     const pass = new Test('firstPass', fn, defaultOpts, null)
  //     const secondPass = new Test('secondPass', fn, defaultOpts, null)

  //     parent.addChildren(fail, pass, secondPass)

  //     const parentFail = jest.fn()
  //     parent.on('fail', parentFail)
  //     const parentPass = jest.fn()
  //     parent.on('pass', parentPass)
  //     const testFail = jest.fn()
  //     fail.on('fail', testFail)
  //     const testPass = jest.fn()
  //     pass.on('pass', testPass)

  //     expect((await parent.run({ bail: true, sequential: false })).status).toBe(Status.Failed)
  //     expect(parent.getStats().done).toBe(1)
  //     expect(testPass).toHaveBeenCalledTimes(0)
  //     expect(testFail).toHaveBeenCalledTimes(1)
  //     expect(parentPass).toHaveBeenCalledTimes(0)
  //     expect(parentFail).toHaveBeenCalledTimes(1)
  //   })

  //   it('sequential', async () => {
  //     // Sequential
  //     const sequentialParent = new Suite('sequentialParent', defaultOpts, null)
  //     const fail = new Test('fail', errorFn, defaultOpts, null)
  //     const pass = new Test('pass', fn, defaultOpts, null)
  //     const secondPass = new Test('secondPass', fn, defaultOpts, null)

  //     const sequentialParentPass = jest.fn()
  //     sequentialParent.on('pass', sequentialParentPass)
  //     const sequentialParentFail = jest.fn()
  //     sequentialParent.on('fail', sequentialParentFail)
  //     const sequentialTestPass = jest.fn()
  //     pass.on('pass', sequentialTestPass)
  //     const sequentialTestFail = jest.fn()
  //     fail.on('fail', sequentialTestFail)

  //     sequentialParent.addChildren(pass, fail, secondPass)

  //     expect((await sequentialParent.run({ bail: true, sequential: true })).status).toBe(Status.Failed)
  //     expect(sequentialParent.getStats().done).toBe(2)
  //     expect(sequentialTestPass).toHaveBeenCalledTimes(1)
  //     expect(sequentialTestFail).toHaveBeenCalledTimes(1)
  //     expect(sequentialParentPass).toHaveBeenCalledTimes(0)
  //     expect(sequentialParentFail).toHaveBeenCalledTimes(1)
  //   })
  // })

  // it('should skip', async () => {
  //   const parent = new Suite('parent', { skip: true }, null)

  //   const start = jest.fn()
  //   parent.on('start', start)
  //   const skip = jest.fn()
  //   parent.on('skip', skip)
  //   const end = jest.fn()
  //   parent.on('end', end)

  //   const promise = parent.run()

  //   expect(skip).toHaveBeenCalledTimes(1)
  //   expect(end).toHaveBeenCalledTimes(1)
  //   expect((await promise).status).toBe(Status.Skipped)
  // })

  // it('should invoke hooks', async () => {
  //   const error = console.error
  //   console.error = jest.fn()

  //   const parent = new Suite('parent', {}, null)
  //   parent.addChildren(
  //     new Test('passing', jest.fn(), {}, parent),
  //     new Test('failing', () => { throw new Error('Fail') }, {}, parent),
  //   )
  //   const calls: string[] = []

  //   parent.hooks.beforeAll.push(
  //     () => calls.push('beforeAll1'),
  //     () => calls.push('beforeAll2'),
  //   )
  //   parent.hooks.beforeEach.push(
  //     async () => await calls.push('beforeEach1'),
  //     () => calls.push('beforeEach2'),
  //     () => { throw new Error('beforeEach hook error') },
  //   )
  //   parent.hooks.afterEach.push(
  //     () => calls.push('afterEach1'),
  //     () => calls.push('afterEach2'),
  //   )
  //   parent.hooks.afterAll.push(
  //     () => calls.push('afterAll1'),
  //     async () => await calls.push('afterAll2'),
  //     async () => { throw new Error('afterAll hook error') },
  //   )

  //   try {
  //     await parent.run()
  //   } catch {
  //     // noop
  //   }
  //   expect(calls).toMatchSnapshot()

  //   expect(console.error).toHaveBeenCalledTimes(3)
  //   expect(console.error).toHaveBeenCalledWith('Error in beforeEach hook: Error: beforeEach hook error')
  //   expect(console.error).toHaveBeenCalledWith('Error in afterAll hook: Error: afterAll hook error')

  //   console.error = error
  // })
})
