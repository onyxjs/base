export async function asyncTimeout(ms: number, promise: () => Promise<any>): Promise<any> {
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
