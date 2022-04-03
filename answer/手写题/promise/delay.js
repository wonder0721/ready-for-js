function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

async function test() {
  console.log(1);
  await delay(2000);
  console.log(2);
}

test();
