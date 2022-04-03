function throttle(fn, delay) {
  let timer;
  return function (...args) {
    let context = this;
    if (timer) return;
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(context, args);
    });
  };
}
