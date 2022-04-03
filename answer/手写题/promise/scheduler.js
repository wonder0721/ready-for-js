class Scheduler {
  queue = []
  runCount = 0
  constructor(limitCount) {
    this.limitCount = limitCount
  }
  addTask(delay, value) {
    this.queue.push(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(value)
          resolve(value)
        }, delay)
      })
    })
    return this
  }

  start() {
    for (let i = 0; i < this.limitCount; i++) {
      this.exec()
    }
  }

  exec() {
    if (!this.queue.length || this.runCount >= this.limitCount) return
    this.runCount++
    this.queue.shift().then(() => {
      this.runCount--
      this.exec()
    })
  }
}

const schedluer = new Scheduler(2)
schedluer.addTask(1000, 1).addTask(200, 2).addTask(400, 3).addTask(600, 4)
schedluer.start()

// 现在有多个异步请求任务，要求最多同时执行三个任务，如何在最短时间内执行完成

let promiseFn = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}
function promiseLimitor(promiseArr, limit, callback) {
  return new Promise((resolve) => {
    let taskQueue = [],
      ans = [],
      runCount = 0
    for (let i = 0; i < promiseArr; i++) {
      taskQueue.push(promiseArr[i])
    }
    function exec() {
      if (promiseArr.length && runCount < limit) {
        runCount++
        let fn = taskQueue.shift()
        fn().then((res) => {
          ans.push(callback(res))
          if (ans.length === promiseArr.length) resolve(ans)
          runCount--
          exec()
        })
      }
    }
    for (let i = 0; i < limit; i++) {
      exec()
    }
  })
}
