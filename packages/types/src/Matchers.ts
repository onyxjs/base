export interface AnyMatchers {
  [key: string]: (expectation: any, ...args: any[]) => boolean;
}
