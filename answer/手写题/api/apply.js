Function.prototype._apply = function (thisArg, ...args) {
  let context = thisArg || window;
  const fn = Symbol("fn");
  context[fn] = thisArg;
  let res = context[fn](args);
  delete context[fn];
  return res;
};
