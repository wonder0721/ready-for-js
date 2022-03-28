/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let stack = []
  for (let i = 0; i < s.length; i++) {
    let item = s[i].toLowerCase()
    if (('a' <= item && item <= 'z') || (item >= '0' && item <= '9')) {
      stack.push(s[i].toLowerCase())
    }
  }
  let p1 = 0,
    p2 = stack.length - 1
  while (p1 < p2) {
    if (stack[p1] !== stack[p2]) return false
    p1++
    p2--
  }
  return true
}

let res = isPalindrome('rac11 car')
console.log(res)
