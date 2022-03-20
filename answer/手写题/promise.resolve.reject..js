Promise._resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

Promise._resolve = function (value) {
  return new Promise((resolve, reject) => {
    reject(value);
  });
};
