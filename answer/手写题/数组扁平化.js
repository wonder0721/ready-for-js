const array = [1, [2, 3], [4, [5, 6, 7]], 8];

// Array.prototype.flat

// reduce递归
function flat(arr) {
  return arr.reduce((cur, next) => {
    return Array.isArray(next) ? [...cur, ...flat(next)] : [...cur, next];
  }, []);
}

// 迭代

console.log(flat(array));
