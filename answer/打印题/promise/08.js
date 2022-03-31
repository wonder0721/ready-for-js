const p = new Promise(resolve => {
    console.log(0)
    resolve()
  })
p.then(res => {
  console.log(1)
}).then(res => {
  console.log(2)
}).then(res => {
  console.log(3)
})
p.then(res => {
  console.log(4)
})
p.then(res => {
  console.log(5)
})
p.then(res => {
  console.log(6)
})