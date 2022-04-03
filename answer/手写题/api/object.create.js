function objectCreate(fn) {
  let _this = {};
  _this.__proto__ = fn.prototype;
  return _this;
}
