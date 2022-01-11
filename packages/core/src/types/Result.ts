// Types
import { Hooks } from './Hooks'

export enum RunStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  PASSED = 'passed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  TODO = 'todo',
}

export type _RunStatus = keyof typeof RunStatus

export type BaseResult = {
  messages: Array<string>
  failures: Array<Error>
  hooks: Hooks
  status: RunStatus
  fullDescription: string
}

export interface RunnableResult extends BaseResult {
  id: string
  description: string
  time: number
}

export enum Status {
  Pending = 'pending',
  Running = 'running',
  Passed = 'passed',
  Failed = 'failed',
  Skipped = 'skipped',
  Todo = 'todo',
}

export type ResultStatus = keyof typeof Status
