import { AnyMatchers, ExpectError } from '@onyx/matchers'

type OmitFirstArg<A> = A extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never

type Expectations<M extends AnyMatchers> = { [K in keyof M]: OmitFirstArg<M[K]> }

export type NegatedExpectations<M extends AnyMatchers> = Expectations<M> & {
  not: Expectations<M>
}


export type ExpectResult<A, E> = {
  matcher: string
  error?: ExpectError
  status: ExpectStatus
  actual: A
  expected: E
}

enum ExpectStatus {
  PASS = 'Pass',
  FAIL = 'Fail',
}

const _expectFail = <F, P = never> (fail: F): ExpectationResult<F, P> => ({ _status: ExpectStatus.FAIL, fail })
const _expectPass = <P, F = never> (pass: P): ExpectationResult<F, P> => ({ _status: ExpectStatus.PASS, pass })

export const expectPass: <F = never, P = never> (pass: P) => ExpectationResult<F, P> = _expectPass
export const expectFail: <F = never, P = never> (fail: F) => ExpectationResult<F, P> = _expectFail

interface IExpectFail<F> {
  readonly _status: ExpectStatus.FAIL
  readonly fail: F
}

interface IExpectPass<P> {
  readonly _status: ExpectStatus.PASS
  readonly pass: P
}

type ExpectationResult<F, P> = IExpectFail<F> | IExpectPass<P>
