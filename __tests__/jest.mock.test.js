import http from '../src/http';
import events from '../src/events';

jest.mock('../src/http.js');

describe('jest.mock() 测试套件', () => {

  test('mock 整个 http.js 模块', async() => {
    expect.assertions(2);
    await events.getPostList();
    expect(http.fetchPostsList).toHaveBeenCalled();
    expect(http.fetchPostsList).toHaveBeenCalledTimes(1);
  });

})
