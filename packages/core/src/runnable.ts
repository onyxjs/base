import { performance } from 'perf_hooks'
import { Test } from '.'
import { Hooks } from './hooks'
import { RunStatus, BaseResult } from './newResult'
import Result, { Status } from './result'
import Suite from './suite'

export const runnableSymbol = Symbol('isRunnable')

/**
 * @description Checks if passed value is an instance of `Runnable`.
 */
export const isRunnable = (v: unknown): v is Runnable => {
  if (v && (v as Runnable)[runnableSymbol]) { return true }
  else { return false }
}

export const isRunnable2 = <R extends Runnable | Test | Suite>(v: unknown): v is R => {
  return (v instanceof Runnable) || (v instanceof Test) || (v instanceof Suite)
}

export enum RunnableTypes {
  Runnable = 'runnable',
  Suite = 'suite',
  Test = 'test',
}

export interface RunnableOptions {
  skip: boolean
  todo: boolean
}

export interface RunnableResult extends BaseResult {
  id: string
  description: string
  time: number
}

const DEFAULT_RESULT: RunnableResult = {
  id: '',
  description: '',
  messages: [],
  failures: [],
  hooks: {} as Hooks,
  status: RunStatus.PENDING,
  time: 0,
  fullDescription: '', 
}

export default abstract class Runnable {

  /**
   * @description Normalize passed options object with `Runnable` default options.
   */
  public static normalizeOptions(options: Partial<RunnableOptions>): RunnableOptions {
    return {
      skip: false,
      todo: false,
      ...options,
    }
  }
  public description: string
  public options: RunnableOptions
  public parent: Suite | null
  public result: RunnableResult
  public status: RunStatus
  public type: RunnableTypes = RunnableTypes.Runnable
  public [runnableSymbol] = true

  public time = 0
  public start = 0

  /* istanbul ignore next */
  constructor(description: string, options: Partial<RunnableOptions> = {}, parent: Suite | null) {
    this.description = description
    this.options = Runnable.normalizeOptions(options)
    this.parent = parent
    this.result = { ...DEFAULT_RESULT, description, fullDescription: this.getFullDescription() }
    this.status = RunStatus.PENDING
  }

  /**
   * @description Run a `Runnable` instance.
   */
  public abstract run(): Promise<RunnableResult>


  /**
   * @description Sets result status to `Running` and emits a `start` event with the `Runnable` instance and timestamp.
   */
  public doStart(): RunnableResult {
    this.result.status = RunStatus.RUNNING
    this.start = performance.now()
    return this.result
  }

  /**
   * @description Emits an `end` event with the completed `Runnable` instance and the time taken to complete.
   */
  public doEnd() {
    if (this.result.status !== RunStatus.SKIPPED && this.result.status !== RunStatus.TODO) {
      this.result.time = performance.now() - this.start
    }
  }

  /**
   * @description Emits a `pass` event with the passing `Runnable` instance.
   */
  public doPass() {
    this.result.status = RunStatus.PASSED
    this.doEnd()

    return this.result
  }

  /**
   * @description Emits a `fail` event with the failed `Runnable` instance and passed error.
   */
  public doFail(error: Error) {
    this.result.failures = [...this.result.failures, error]
    this.result.status = RunStatus.FAILED
    this.doEnd()

    return this.result
  }

  /**
   * @description Emits `skip` event with the skipped `Runnable` instance.
   */
  public doSkip(skipOrTodo: RunStatus.SKIPPED | RunStatus.TODO) {
    this.result.status = skipOrTodo
    this.doEnd()

    return this.result
  }

  /**
   * @description Check that `Runnable` has completed.
   */
  public isDone() {
    return this.result.status !== RunStatus.PENDING && this.result.status !== RunStatus.RUNNING
  }

  /**
   * @description Concatenate the Parent's description and the current `Runnable`'s description.
   */
  public getFullDescription(): string {
    if (this.parent && !this.parent.isRoot()) {
      return `${this.parent.getFullDescription()} -> ${this.description}`
    }
    return this.description
  }
}
