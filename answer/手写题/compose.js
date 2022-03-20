// 函数compose 从右向左 依次处理
function compose(...fnArgs) {
  if (fnArgs.length === 0) return (arg) => arg;
  if (fnArgs.length === 1) return fnArgs[0];
  return fnArgs.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
}

// 迭代实现

// 异步compose 使用.then链式调用实现

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
