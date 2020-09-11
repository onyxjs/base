import { EventEmitter } from 'events';

// Status
export enum Status {
  Pending = "pending",
  Running = "running",
  Passed = "passed",
  Failed = "failed",
  Skipped = "skipped",
  Todo = "todo",
}

// Result
export interface Result {
  internalStatus: Status;
  internalMessages: string[];

  new (messages: string | string[], status?: Status): Result;

  isDone(): boolean;

  addMessages(): void;

  status: Status;

  messages: string[];
}

// Runnable Types
export enum RunnableTypes {
  Runnable = "runnable",
  Suite = "suite",
  Test = "test",
}

// Runnable Options
export interface RunnableOptions {
  skip: boolean;
  todo: boolean;
}

// Runnable Symbol
export const runnableSymbol = Symbol('isRunnable');

// Runnable
export interface Runnable extends EventEmitter {
  normalizeOptions(options: Partial<RunnableOptions>): RunnableOptions;

  description: string;
  result: Result;
  options: RunnableOptions;
  parent: Suite | null;
  type: RunnableTypes;
  [runnableSymbol]: true;
  time: number;
  start: number;

  new(description: string, options: Partial<RunnableOptions>, parent: Suite | null): Runnable;

  doStart(): void;

  doEnd(): void;

  doPass(): Result;

  doFail(error?: Error | string): Result;

  doSkip(todo: boolean): Result;

  isDone(): boolean;

  getFullDescription(): string;
}

// TestFn
export type TestFn = () => (void | Promise<void>);

// Test
export interface Test extends Runnable {
  fn: TestFn;
  type: RunnableTypes.Test;

  new(description: string, fn: TestFn, options: Partial<RunnableOptions>, parent: Suite | null): Test;

  run(options: Partial<RunOptions>): Promise<Result>;
}

// Suite
export interface SuiteStats {
  total: number;
  pending: number;
  running: number;
  done: number;
  passed: number;
  failed: number;
  skipped: number;
  todo: number;
  time: number;
}

// Root Symbol
export const rootSymbol = Symbol('isRoot');

export interface Suite extends Runnable {
  children: Runnable[];

}

// Bail Error
export interface BailError extends Error {
  new(message: string): BailError;
}


export type RunOptions = {
  bail: boolean,
  sequential: boolean;
  timeout: number;
}

export interface Runner {
  rootSuite: Suite;
  options: RunOptions;
  stats: SuiteStats;

  new(suite: Suite, options: Partial<RunOptions>): Runner;
}
