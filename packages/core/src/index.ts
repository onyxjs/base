import describe, { root } from './interface';
(global as any).describe = describe;
(global as any).root = root;

export { root, ItFn, It, DescribeCallback, default as describe } from './interface';
export { Status, default as Result } from './result';
export { default as Runnable } from './runnable';
export { default as Test } from './test';
export { default as Suite } from './suite';
