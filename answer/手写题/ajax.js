function ajaxPromise(options) {
  return new Promise((resolve, reject) => {
    const instance = new XMLHttpRequest();
    instance.open(options.method.toUpperCase(), options.url, false);
    instance.setRequestHeader("Accept", "application/json");
    instance.onreadystatechange = function () {
      if (instance.readyState !== 4) return;
      if (instance.status === 200 || instance.status === 304) {
        resolve(instance.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    instance.send();
  });
}
