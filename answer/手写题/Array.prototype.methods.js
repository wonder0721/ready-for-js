// forEach
Array.prototype._forEach = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};
// map
Array.prototype._map = function (callback, thisArg) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res[i] = callback.call(thisArg, this[i], i, this);
  }
  return res;
};

// filter
Array.prototype._filter = function (callback, thisArg) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      res.push(this[i]);
    }
  }
  return res;
};

// reduce
Array.prototype._reduce = function (callback, initialValue) {
  let current;
  let k = 0;
  if (arguments.length > 1) {
    current = initialValue;
  }
  // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
  else {
    while (k < length && !(k in this)) {
      k++;
    }
    if (k > length) return new Error("empty array");
    current = this[k];
    k++;
  }
  for (let i = k; i < this.length; i++) {
    current = callback.call(current, this[i], i, this);
  }
  return current;
};

// find
Array.prototype._find = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return this[i];
    }
  }
};

// findIndex
Array.prototype.findIndex = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return i;
    }
  }
};

// some
Array.prototype._some = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return true;
    }
  }
  return false;
};

// every
Array.prototype._every = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (!callback.call(thisArg, this[i], i, this)) {
      return false;
    }
  }
  return true;
};
