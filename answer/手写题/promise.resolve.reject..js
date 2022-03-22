Promise._resolve = function (value) {
  if (value instanceof Promise) return value;
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

Promise._resolve = function (value) {
  if (value instanceof Promise) return value;
  return new Promise((resolve, reject) => {
    reject(value);
  });
};
