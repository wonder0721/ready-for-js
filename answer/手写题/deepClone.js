// 实现一个深拷贝 考虑日期正则及对象循环引用
function deepClone(source, cache = new WeakMap()) {
  if (cache.get(source)) return source
  let isObject = val => (typeof val === 'object' || typeof val === 'function') && val !== null
  if (/^(RegExp|Date)$/.test(source.constructor.name)) return new source.constructor(source)
  if (!isObject(source)) return source
  cache.set(source, true)
  let target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      const item = source[key]
      target[key] = deepClone(item, cache)
    }
  }
  return target
}

function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return obj
  }
  let res = null
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error]

  if (reference.includes(obj?.constructor)) {
    res = new obj.constructor(obj)
  } else if (Array.isArray(obj)) {
    res = []
    obj.forEach((e, i) => {
      res[i] = deepClone(e)
    })
  } else if (typeof obj === 'Object' && obj !== null) {
    res = {}
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        res[key] = deepClone(obj[key])
      }
    }
  } else {
    res = obj
  }
  hash.set(obj, res)
  return res
}
