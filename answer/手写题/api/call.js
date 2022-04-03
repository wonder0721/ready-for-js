Function.prototype._call = function (thisArg, ...args) {
  let context = thisArg || window; // thisArg 为null时 指向window
  const fn = Symbol("fn");
  context[fn] = this;
  let res = context[fn](...args);
  delete context[fn];
  return res;
};
