### You Don't Know Javascript

- 用 let 和 const 定义的在 script 中的变量，没有挂载在 window 上 而是在 script 标签中形成了块级作用域 要访问的话直接在 script 中取值就行而不是在 window 上取值（es5 中的 var 是直接挂载在 window 上）

```js
let x = 123;
console.log(x); // 123
console.log(window.x); // undefined
```

- 箭头函数的 this 在创建时就已经确定了 指向外层作用域的 this 不可能被修改
- js 基本数据类型：number,boolean,string,undefined,null,symbol,bigInt

1. DOM0 级事件，直接在 html 元素上绑定 on-event，比如 onclick，取消的话，dom.onclick = null，同一个事件只能有一个处理程序，后面的会覆盖前面的。

2. DOM2 级事件，通过 addEventListener 注册事件，通过 removeEventListener 来删除事件，一个事件可以有多个事件处理程序，按顺序执行，捕获事件和冒泡事件

- master
