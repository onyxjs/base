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
