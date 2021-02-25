export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    resolve({user: 'daiboy'});
  })
}

export const fetchList = () => {
  return new Promise((resolve, reject) => {
    resolve(['香蕉', '黄瓜']);
  })
}
