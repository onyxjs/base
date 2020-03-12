export async function asyncTimeout<T>(ms: number, promise: () => Promise<T>): Promise<T> {
  let id: NodeJS.Timeout;
  const timeout = new Promise((reject) => {
    id = setTimeout(() => {
      reject(new Error(`timed out in: ${ms}ms.`));
    }, ms);
  });

  return Promise.race([
    promise,
    timeout,
  ]).then((result) => {
    clearTimeout(id);
    return result;
  });
}
