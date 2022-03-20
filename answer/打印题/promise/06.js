Promise.resolve()
  .then(() => {
    console.log('promise1');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('timer2')
          resolve()
        }, 0)
    })
      .then(async () => {
        await foo();
        return new Error('error1')
      })
      .then((ret) => {
        setTimeout(() => {
          console.log(ret);
          Promise.resolve()
          .then(() => {
            return new Error('error!!!')
          })
          .then(res => {
            console.log("then: ", res)
          })
          .catch(err => {
            console.log("catch: ", err)
          })
        }, 1 * 3000)
      }, err => {
        console.log(err);
      })
      .finally((res) => {
        console.log(res);
        throw new Error('error2')
      })
      .then((res) => {
        console.log(res);
      }, err => {
        console.log(err);
      })
  })
  .then(() => {
    console.log('promise2');
  })

function foo() {
  setTimeout(() => { 
    console.log('async1');
  }, 2 * 1000);
}

setTimeout(() => {
  console.log('timer1')
  Promise.resolve()
    .then(() => {
      console.log('promise3')
    })
}, 0)

console.log('start');