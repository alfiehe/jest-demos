/**
 * 异步请求代码示例
 */
import axios from 'axios';

export default {
  // 传入一个回调函数，获取数据后执行
  async fetchThenCallback (callback) {
    axios.get('https://bird.ioliu.cn/v2/?url=https://music.163.com/store/api/searchsuggest/get')
      .then(response => {
        callback(response.data);
      })
  },

  // 返回一个 Promise
  async fetchReturnPromise() {
    return axios.get('https://bird.ioliu.cn/v2/?url=https://music.163.com/store/api/searchsuggest/get');
  },

  // 返回一个 403 接口
  async fetchReturn403() {
    return axios.get('https://m10.music.126.net/20200114152235/1231231');
  },

  // fetchPostsList
  async fetchPostsList(callback) {
    return axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
        return callback(res.data);
      });
  }
}





