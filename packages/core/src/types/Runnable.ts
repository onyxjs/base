export enum RunnableTypes {
  Runnable = 'runnable',
  Suite = 'suite',
  Test = 'test',
}

export interface RunnableOptions {
  skip: boolean
  todo: boolean
}
