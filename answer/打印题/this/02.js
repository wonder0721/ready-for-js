let x = 11
console.log(x)
let obj = {
  x: 1,
  foo: function () {
    console.log(this.x)
  },
  foo1: () => {
    console.log(this.x)
  }
}
obj.foo1()
let bar = obj.foo1.bind(obj)
bar()
