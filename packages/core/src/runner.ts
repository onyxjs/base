import Suite, { Stats } from './suite';

export interface RunOptions {
  bail: boolean;
  timeout: number;
}

export const runnerDefaults: RunOptions = {
  bail: false,
  timeout: 10000,
};

export default class Runner {
  public rootSuite: Suite;
  public options: RunOptions;
  public stats: Stats;

  constructor(suite: Suite, options: Partial<RunOptions> = {}) {
    this.options = {
      ...runnerDefaults,
      ...options,
    };
    this.rootSuite = suite;
    this.stats = suite.getStats();
  }

  public run() {
    this.rootSuite.run(this.options);

    this.stats = this.rootSuite.getStats();
    return this.stats;
  }

  public async asyncRun() {
    await this.rootSuite.asyncRun(this.options);

    this.stats = this.rootSuite.getStats();
    return this.stats;
  }
}
