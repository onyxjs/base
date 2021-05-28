import mock, { Mock } from './mock'

export type Prop = string | number | symbol
 
export default function spy(obj: any, prop: Prop, cb?: (args: any[], result: any) => any, impl?: (...args: any[]) => any): Mock {
  obj[prop] = mock(impl || obj[prop], cb)
  return obj[prop]
}
