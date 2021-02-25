// 异步函数，回调函数方式
export const getDataCallback = callback => {
  setTimeout(() => {
    callback('feifei');
  }, 1000);
}

// 异步函数，返回Promise方式
export const getDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('daiboy');
    }, 1000);
  });
}