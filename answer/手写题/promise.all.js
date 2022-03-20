Promise._all = function (promiseArray) {
  if (!Array.isArray(promiseArray))
    throw new Error("promiseArray must be an array");
  return new Promise((resolve, reject) => {
    let output = [],
      num = 0;
    for (let i = 0; i < promiseArray.length; i++) {
      const item = promiseArray[i];
      if (!item instanceof Promise) {
        num++;
        output[i] = item;
      }
      item
        .then((res) => {
          output[i] = res;
          num++;
          if (num === promiseArray.length) {
            resolve(output);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};
