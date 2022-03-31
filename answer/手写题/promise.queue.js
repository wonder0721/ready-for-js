// 实现一个Queue，task方法可以添加任务，在一段延迟后执行下一个任务，start方法开始这个任务队列

function Queue() {
  this.tasks = []
}

Queue.prototype.task = function (delay, fn) {
  this.tasks.push(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        fn()
        resolve()
      }, delay)
    })
  })
  return this
}

Queue.prototype.start = function () {
  let p = Promise.resolve()
  this.tasks.forEach(v => {
    p = p.then(v)
  })
}

new Queue()
  .task(1000, () => {
    console.log(1)
  })
  .task(2000, () => {
    console.log(2)
  })
  .task(3000, () => {
    console.log(3)
  })
  .start()
