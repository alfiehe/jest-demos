/* global window */
import axios from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';

const JSONP = [];

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

axios.defaults.validateStatus = function (status) {
  if (status === 401) {
    if (/woa/.test(location.href)) {
      window.location.href = '//v.zenvideo.woa.com';
    }
  }
  return true;
};

// 添加全局响应拦截器
axios.interceptors.response.use(response => response, error => Promise.reject(error));

const fetch = (options) => {
  const { method = 'get', rawData, fetchType, url } = options;
  const {
    data,
  } = options;

  data.relogin = 1;

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve({ statusText: 'OK', status: 200, data: result });
      });
    });
  }

  let params;
  if (method.toLowerCase() === 'post') {
    params = qs.stringify(rawData || data);
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
        headers: Object.assign({
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
        }, options.headers || {}),
      });
    case 'delete':
      return axios.delete(url, {
        data,
      });
    case 'post':
      return axios.post(url, params, {
        headers: Object.assign({
          // 'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded'
          'Content-Type': 'application/x-www-form-urlencoded',
        }, options.headers || {}),
      });
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

export default function request(opts) {
  const options = opts;
  options.data = options.data || {};
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`;
    if (window.location.origin !== origin) {
      if (JSONP && JSONP.indexOf(origin) > -1) {
        options.fetchType = 'JSONP';
      } else {
        options.fetchType = 'CORS';
        // options.withCredentials = true;
      }
    }
  }

  return fetch(options).then((response) => {
    const { statusText, status } = response;
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    if (response.status === 401) {
      return Promise.reject(response);
    }

    const service = options.url;
    if (response.status === 200 && options.method === 'post') { // 自动上报特定post请求结果
      const issuccess = response.data && (response.data.code === 0
        || (response.data.response && response.data.response.code === 0));
      window.OMdtReport && window.OMdtReport('feedback', {
        ...window.OMReportRouterinfo || {},
        fb_result: issuccess ? 'success' : 'fail',
        fb_service: service,
        fail_msg: issuccess ? '' : response.msg || '',
        fail_code: issuccess ? '' : response.code || '',
      });
    }

    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    });
  })
    .catch((error) => {
      console.error(error);
      const { response } = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else if (error.status && error.status === 401) {
        statusCode = 401;
        msg = error.statusText || 'Network Error';
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }
      /* eslint-disable */
        return Promise.reject({ success: false, statusCode, message: msg });
    });
}
