import { Prop } from './spy'

export default function watch(
  object: { [key: string]: any },
  properties: Prop[],
  getCb?: (value: any) => any,
  setCb?: (value: any) => any,
): { [key: string]: any } {
  return new Proxy(object, {
    get: (t, p, r): any => {
      const v = Reflect.get(t, p, r)
      if (properties.indexOf(p) >= 0 && getCb) { getCb(v) }
      return v
    },
    set: (t, p, v, r): boolean => {
      if (properties.indexOf(p) >= 0 && setCb) { setCb(v) }
      return Reflect.set(t, p, v, r)
    },
  })
}
