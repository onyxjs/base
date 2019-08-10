import mock, { Mock } from './mock';

export type Prop = string | number | symbol;

// tslint:disable-next-line:ban-types
export default function spy(obj: any, prop: Prop, cb?: (args: any[], result: any) => any, impl?: Function): Mock {
  obj[prop] = mock(impl || obj[prop], cb);
  return obj[prop];
}
