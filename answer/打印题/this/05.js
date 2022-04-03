function foo() {
  console.log(this.name);
}

let a = {
  name: "a",
};

let b = {
  name: "b",
};

let bar = foo.bind(a);
bar();

let baz = bar.bind(b);
baz();
