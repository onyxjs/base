import Suite, { SuiteStats } from './suite';

export interface RunOptions {
  bail: boolean | number;
  sequential: boolean;
  timeout: number;
}
/**
 * @description Default runner options
 */
export const runnerDefaults: RunOptions = {
  bail: false,
  sequential: false,
  timeout: 10000,
};

export function normalizeRunOptions(options: Partial<RunOptions> = {}): RunOptions {
  return {
    ...runnerDefaults,
    ...options,
  };
}

export default class Runner {
  public rootSuite: Suite;
  public options: RunOptions;
  public stats: SuiteStats;

  constructor(suite: Suite, options: Partial<RunOptions> = {}) {
    this.options = normalizeRunOptions(options);
    this.rootSuite = suite;
    this.stats = suite.getStats();
  }

  /**
   * @description Calls run on the root suite, passing the current `Runner` instance options.
   */
  public async run() {
    await this.rootSuite.run(this.options);

    this.stats = this.rootSuite.getStats();
    return this.stats;
  }
}
