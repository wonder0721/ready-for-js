this.name = 'global'
let obj = {
  name: 'obj',
  getName() {
    console.log(this.name)
  },
  getName2: () => {
    console.log(this.name)
  }
}

let foo = function (fn) {
  fn()
}

obj.getName()
foo(obj.getName)
foo(obj.getName.bind(obj))
obj.getName2()
foo(obj.getName2)
