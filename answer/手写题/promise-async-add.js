// 异步加法
function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b)
  }, Math.random() * 1000)
}
async function total() {
  const res1 = await sum(1, 2, 3, 4, 5, 6, 4)
  const res2 = await sum(1, 2, 3, 4, 5, 6, 4)
  return [res1, res2]
}
total()
// 实现下sum函数。注意不能使用加法，在sum中借助asyncAdd完成加法。尽可能的优化这个方法的时间。

function sum(...args) {
  return new Promise((resolve, reject) => {
    asyncAdd(args[0], args[1], (err, res) => {
      if (err) reject(err)
      if(args.length < 2) resolve(res)
      sum(...[res, ...args.slice(2)])
    })
  })
}
