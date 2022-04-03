class EventBus {
  task = {};
  constructor() {}
  on(name, fn) {
    this.task.name ? this.task.name.push(fn) : (this.task.name = []);
  }
  off(name, fn) {
    if (this.task.name && this.task.name.find((v) => v === fn)) {
      this.task.name = this.task.name.filter((v) => v !== fn);
    }
  }
  once(name, fn) {
    this.task.name
      ? this.task.name.push(() => {
          fn();
          this.off(name, fn);
        })
      : (this.task.name = []);
  }
  emit(name) {
    if (this.task.name) {
      this.task.name.forEach((item) => {
        item();
      });
    }
  }
}
