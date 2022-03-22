class Scheduler {
  queue = [];
  runCount = 0;
  constructor(limitCount) {
    this.limitCount = this.limitCount;
  }
  addTask(delay, value) {
    this.queue.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(value);
          resolve(value);
        }, delay);
      });
    });
  }

  start() {
    for (let i = 0; i < this.limitCount; i++) {
      this.exec();
    }
  }

  exec() {
    if (!this.queue.length || this.runCount >= this.limitCount) return;
    this.runCount++;
    this.queue.shift().then(() => {
      this.runCount--;
      this.exec();
    });
  }
}

const schedluer = new Scheduler();
schedluer.addTask(1000, 1);
schedluer.addTask(200, 2);
schedluer.addTask(400, 3);
schedluer.addTask(600, 4);
schedluer.start();
