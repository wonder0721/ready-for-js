Promise._any = function (promiseArray) {
  return new Promise((reslove, reject) => {
      let num = 0
      let output = []
    promiseArray.forEach((item) => {
      item.then(resolve).catch((error) => {
          num++
          output[i] = error
          if(num === promiseArray.length){
              reject(output)
          }
      }));
    });
  });
};
