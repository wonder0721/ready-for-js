Promise.prototype._finally = function () {
  return new Promise((resolve) => {
    this.then(resolve).catch(resolve);
  });
};
