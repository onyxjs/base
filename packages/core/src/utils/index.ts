// Types
import { RunOptions } from '../types'

const RunnerDefaults: RunOptions = {
  bail: false,
  sequential: false,
  timeout: 10000,
}

export function normalizeRunOptions(options: Partial<RunOptions> = {}): RunOptions {
  return {
    ...RunnerDefaults,
    ...options,
  }
}

export function promisifyTimeoutFn(
  // error: Error = new Error(),
  ms: number,
  testFn: () => Promise<void>,
  timer: NodeJS.Timeout,
) {
  const wait = new Promise(resolve => {
    timer = setTimeout(resolve, ms)
  })

  return Promise.race([
    wait.then(() => {
      clearTimeout(timer)
      throw new Error()
    }),
    testFn(),
  ])
}
