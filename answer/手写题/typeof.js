function typeOf(value) {
  const str = Object.prototype.toString.call(value).split(" ")[1];
  return str.substr(0, str.length - 1);
}
