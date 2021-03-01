
module.exports = {

  // 遍历数组，对数组每一项执行一次回调函数
  forEach(items, callback) {
    for(let i = 0; i < items.length; i++) {
      callback(items[i]);
    }
  },

}
