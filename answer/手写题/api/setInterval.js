function _setInterval(fn, timeout, ...args) {
  let loop = () => {
    setTimeout(() => {
      fn.call(this, ...args);
      loop();
    }, timeout);
  };
  loop();
}

_setInterval(() => {
  console.log(1);
}, 1000);
