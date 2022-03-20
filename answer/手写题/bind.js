Function.prototype._bind = function (thisArg, ...args) {
  let _this = this;
  return function (...arg) {
    _this.call(thisArg, ...args, ...arg);
  };
};
