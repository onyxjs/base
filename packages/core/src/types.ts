/**
 * @description Events used for tests and suites
 */
export enum OnyxEvents {
  AfterAll = 'afterAll',
  BeforeAll = 'beforeAll',
  afterEach = 'afterEach',
  BeforeEach = 'beforeEach',
  SuiteEnd = 'end',
  SuiteFail = 'fail',
  SuitePass = 'pass',
  SuiteSkip = 'skip',
  SuiteStart = 'start',
  TestEnd = 'end',
  TestFail = 'fail',
  TestPass = 'pass',
  TestSkip = 'skip',
  TestStart = 'start',
}

export type OnyxEvent = OnyxEvents.SuiteEnd | OnyxEvents.SuiteFail | OnyxEvents.SuitePass
            | OnyxEvents.SuiteSkip | OnyxEvents.SuiteStart | OnyxEvents.TestEnd | OnyxEvents.TestFail
            | OnyxEvents.TestPass | OnyxEvents.TestSkip | OnyxEvents.TestStart | OnyxEvents.AfterAll
            | OnyxEvents.BeforeAll | OnyxEvents.BeforeEach | OnyxEvents.afterEach;
