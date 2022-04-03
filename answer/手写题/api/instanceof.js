function _instanceof(left, right) {
  let temp = left.__proto__;
  while (temp) {
    if (temp === right.prototype) {
      return true;
    }
    temp = temp.__proto__;
  }
  return false;
}
