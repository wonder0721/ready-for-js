Function.prototype._bind = function (thisArg, ...args) {
  let _this = this;
  return function (...arg) {
    _this.call(thisArg, ...args, ...arg);
  };
};

var hammingDistance = function (x, y) {
  let str1 = x.toString(2);
  let str2 = y.toString(2);
  let diff = Math.abs(str1.length - str2.length);
  let num = 0,
    i = 0;
  if (str1.length > str2.length) {
    str1 = str1.slice(diff);
  } else if (str2.length > str1.length) {
    str2 = str2.slice(diff);
  }
  console.log(str1, str2);
  while (i < str1.length) {
    if (str1[i] !== str2[i]) {
      num++;
    }
    i++;
  }
  return num;
};

res = hammingDistance(1, 4);
console.log(res);
