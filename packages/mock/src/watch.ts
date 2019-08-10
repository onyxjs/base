import { Prop } from './spy';

export default function watch(
  object: object,
  properties: Prop[],
  getCb?: (value: any) => any,
  setCb?: (value: any) => any,
) {
  return new Proxy(object, {
    get: (t, p, r) => {
      const v = Reflect.get(t, p, r);
      if (properties.indexOf(p) >= 0 && getCb) { getCb(v); }
      return v;
    },
    set: (t, p, v, r) => {
      if (properties.indexOf(p) >= 0 && setCb) { setCb(v); }
      return Reflect.set(t, p, v, r);
    },
  });
}
