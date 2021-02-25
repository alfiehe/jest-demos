import http from '../src/http';
import events from '../src/events';

describe('jest.spyOn() 测试套件', () => {

  test('使用jest.spyOn()监控http.fetchPostsList被正常调用', async() => {
    expect.assertions(2);
    const spyFn = jest.spyOn(http, 'fetchPostsList');
    await events.getPostList();
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledTimes(1);
  });

})
