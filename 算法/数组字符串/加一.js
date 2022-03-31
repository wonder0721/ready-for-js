/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let flag = true,
    i = digits.length - 1
  while (i >= 0) {
    if (digits[i] !== 9) {
      flag = false
      break
    }
    i--
  }
  // 全部数字为9 首位加一
  if (flag) {
    let k = 0
    while (k < digits.length) {
      digits[k] = 0
      k++
    }
    digits.unshift(1)
  }
  // 倒数第一个不为9的索引位置加一 后面变零
  else {
    digits[i] = digits[i] + 1
    for (j = i + 1; j < digits.length; j++) {
      digits[j] = 0
    }
  }
  return digits
}

let input = [9]
let res = plusOne(input)
console.log(res)
