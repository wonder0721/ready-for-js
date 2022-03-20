function debounce(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    let context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
