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

// Suite stats
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

// Hooks
export type HookFn = (() => void) | (() => Promise<void>);
export type Hook = HookFn[];
export interface Hooks {
  beforeAll: Hook;
  afterAll: Hook;
  beforeEach: Hook;
  afterEach: Hook;
}
export type HookName = keyof Hooks;

// Root Symbol
export const rootSymbol = Symbol('isRoot');

// Suite
export interface Suite extends Runnable {
  children: Runnable[];
  type: RunnableTypes.Suite;
  options: RunnableOptions;
  hooks: Hooks;
  failed: number;

  new(description: string, options: Partial<RunnableOptions>, parent: Suite): Suite;

  invokeHook(name: HookName): void;

  addChildren(...children: Runnable[]): void;

  isRoot(): boolean;

  run(options?: Partial<RunOptions>): Promise<Result>;

  getStats(): SuiteStats;
}

// Interface
export type DescribeFn = (description: string, fn: () => void) => Suite;

export interface Describe extends DescribeFn {
  skip: DescribeFn;
  todo: DescribeFn;
}

export type ItFn = (description: string, fn: () => void) => Test;

export interface It extends ItFn {
  skip: ItFn;
  todo: ItFn;
}

// Bail Error
export interface BailError extends Error {
  new(message: string): BailError;
}

// Run Options
export type RunOptions = {
  bail: boolean,
  sequential: boolean;
  timeout: number;
}

// Runner
export interface Runner {
  rootSuite: Suite;
  options: RunOptions;
  stats: SuiteStats;

  new(suite: Suite, options: Partial<RunOptions>): Runner;
}
