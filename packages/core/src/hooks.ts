import { currentRoot } from './interface'

export type HookFn = (() => void) | (() => Promise<void>)
export type Hook = HookFn[]
export interface Hooks {
  beforeAll: Hook
  afterAll: Hook
  beforeEach: Hook
  afterEach: Hook
}
export type HookName = keyof Hooks

export const beforeAll: (...hooks: HookFn[]) => number = (...hooks: HookFn[]) => currentRoot.hooks.beforeAll.push(...hooks)
export const afterAll: (...hooks: HookFn[]) => number = (...hooks: HookFn[]) => currentRoot.hooks.afterAll.push(...hooks)
export const beforeEach: (...hooks: HookFn[]) => number = (...hooks: HookFn[]) => currentRoot.hooks.beforeEach.push(...hooks)
export const afterEach: (...hooks: HookFn[]) => number = (...hooks: HookFn[]) => currentRoot.hooks.afterEach.push(...hooks)
