Promise._allSettled = function (promiseArray) {
  let num = 0;
  let output = [];
  return new Promise((resolve, reject) => {
    promiseArray.forEach((item) => {
        item.then((res) => {
            output.push({value: res, status: 'fulfilled'})
            if(output.length === promiseArray.length){
                resolve(output)
            }
        })).catch((error) => {
            output.push({value: error, status: 'rejected'})
            if(output.length === promiseArray.length){
                resolve(output)
            }
        }));
      });
  })
};
