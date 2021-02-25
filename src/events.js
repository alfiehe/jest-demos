import http from './http';

export default {
  async getPostList() {
    return http.fetchPostsList(data => {
      console.log('fetchPostsList be called!');
      // do something
    });
  }
}