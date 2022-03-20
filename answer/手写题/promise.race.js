Promise._race = function (promiseArray) {
  return new Promise((reslove, reject) => {
    promiseArray.forEach((item) => {
      item.then(resolve).catch(reject);
    });
  });
};
