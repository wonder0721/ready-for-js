function Parent(name) {
  this.name = name;
}

Parent.prototype.say = function () {
  console.log("this is parent");
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent);
Child.prototype.constructor = Child;

Child.prototype.run = function () {
  console.log("i am running");
};

let parent = new Parent("dodo", 44);
let child = new Child("lili", 11);
