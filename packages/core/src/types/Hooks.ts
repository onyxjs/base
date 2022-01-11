export type HookFn = (() => void) | (() => Promise<void>)
export type Hook = HookFn[]
export interface Hooks {
  beforeAll: Hook
  afterAll: Hook
  beforeEach: Hook
  afterEach: Hook
}
export type HookName = keyof Hooks
