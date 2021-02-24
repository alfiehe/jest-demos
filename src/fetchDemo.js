/**
 * 异步请求代码示例
 */
import axios from 'axios';

// 传入一个回调函数，获取数据后执行
export function fetchThenCallback (callback) {
  axios.get('https://bird.ioliu.cn/v2/?url=https://music.163.com/store/api/searchsuggest/get')
    .then(response => {
      callback(response.data);
    })
}

// 返回一个 Promise
export function fetchReturnPromise() {
  return axios.get('https://bird.ioliu.cn/v2/?url=https://music.163.com/store/api/searchsuggest/get');
}

// 返回一个 403 接口
export function fetchReturn403() {
  return axios.get('https://m10.music.126.net/20200114152235/1231231');
}