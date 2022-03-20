// 实现一个深拷贝 考虑日期正则及对象循环引用
function deepClone(source, cache = new WeakMap()) {
  if (cache.get(source)) return source;
  let isObject = (val) =>
    (typeof val === "object" || typeof val === "function") && val !== null;
  if (/^(RegExp|Date)$/.test(source.constructor.name))
    return new source.constructor(source);
  if (!isObject(source)) return source;
  cache.set(source, true);
  let target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      const item = source[key];
      target[key] = deepClone(item, cache);
    }
  }
  return target
}
