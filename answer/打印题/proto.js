function Person(name) {
  this.name = name;
}

let person = new Person("lili");

console.log(person.__proto__);
console.log(person.__proto__.__proto__);
console.log(person.__proto__.__proto__.__proto__);

console.log(Person.prototype);
console.log(Person.__proto__);
console.log(Person.__proto__.__proto__);
console.log(Person.__proto__.__proto__.__proto__);
