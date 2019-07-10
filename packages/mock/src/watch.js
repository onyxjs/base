export default function watch (object, properties, getCb = undefined, setCb = undefined) {
  return new Proxy(object, {
    get: (t, p, r) => {
      const v = Reflect.get(t, p, r);
      if (properties.indexOf(p) >= 0) getCb(v);
      return v;
    },
    set: (t, p, v, r) => {
      if (properties.indexOf(p) >= 0) setCb(v);
      return Reflect.set(t, p, v, r);
    },
  });
}
