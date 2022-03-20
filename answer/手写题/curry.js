function curry(fn) {
  return function judge(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...arg) => judge(...args, ...arg);
  };
}

// 实现add函数 支持add(1)(2)(3)
function add(...args) {
  function temp(...arg) {
    return arg.reduce((cur, next) => {
      return cur + next;
    }, 0);
  }
  return (...arg) => {
    if (!arg.length) return temp(...args);
    return add(...args, ...arg);
  };
}

console.log(add(1, 2)(3)(4)());
// add(1, 2)(3);
