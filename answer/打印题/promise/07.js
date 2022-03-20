async function async1() {
    console.log('async1 start');
    new Promise((resolve, reject) => {
      try {
        throw new Error('error1')
      } catch(e) {
        console.log(e);
      }
      setTimeout(() => { // 宏3
        resolve('promise4')
      }, 3 * 1000);
    })
      .then((res) => { // 微3-1
        console.log(res);
      }, err => {
        console.log(err);
      })
      .finally(res => { // 微3-2 // TODO注3
        console.log(res);
      })
    console.log(await async2()); // 微4-1  TODO-注1
    console.log('async1 end'); // 微4-2 // TODO-注2
  }
  
  function async2() {
    console.log('async2');
    return new Promise((resolve) => {
      setTimeout(() => { // 宏4
        resolve(2)
      }, 1 * 3000);
    })
  }
  
  console.log('script start');
  
  setTimeout(() => { // 宏2
    console.log('setTimeout');
  }, 0)
  
  async1();
  
  new Promise((resolve) => {
    console.log('promise1');
    resolve();
  })
    .then(() => { // 微1-2
      console.log('promise2');
      return new Promise((resolve) => {
        resolve()
      })
        .then(() => { // 微1-3
          console.log('then 1-1')
        })
    })
    .then(() => { // 微1-4
      console.log('promise3');
    })
  
  
  console.log('script end');
  
  作者：前端自学驿站
  链接：https://juejin.cn/post/6868849475008331783
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。