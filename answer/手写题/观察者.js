let target = null

function ob(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      let dep = []
      Object.defineProperty(obj, key, {
        get() {
          dep.push(target)
          return element
        },
        set(val) {
          obj[key] = val
          dep.forEach((v) => v())
        }
      })
    }
  }
}

function watch(callback) {
  target = callback
  callback()
}
