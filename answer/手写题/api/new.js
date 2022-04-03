function _new(fn, ...args) {
  let _this = {};
  let res = fn.call(_this, ...args);
  _this.__proto__ = fn.prototype;
  return typeof res === "object" ? res || _this : _this;
}
