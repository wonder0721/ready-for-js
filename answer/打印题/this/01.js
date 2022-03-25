this.name = 'global'
function createFn(fn) {
  return function (...args) {
    fn.call(this, ...args)
  }
}

function createFn2(fn) {
  return function () {
    fn()
  }
}

let obj = {
  name: 'obj'
}

let foo = function () {
  console.log(this.name)
}

createFn(foo)()
obj.b = createFn(foo)
obj.c = createFn2(foo).bind(obj)
obj.b()
obj.c()
