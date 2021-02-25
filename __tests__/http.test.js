/**
 * 异步代码测试用例
 */
import http from '../src/http';

describe('测试 done() 方法使用', () => {
  it('fetchThenCallback done() test', (done) => {
    http.fetchThenCallback(data => {
      expect(data).toMatchObject({ code: 200 });
      done();
    });
  });
  it('fetchReturnPromise done() test', (done) => {
    http.fetchReturnPromise().then(response => {
      expect(response.data).toMatchObject({ code: 200 });
      done();
    });
  });
  it('fetchReturn403 done() test', (done) => {
    http.fetchReturn403().catch(error => {
      expect(error.toString()).toEqual('Error: Request failed with status code 403');
      expect(error.toString()).toMatch(/403/);
      done();
    });
  });
});

describe('测试 return 方式，被测试方法需返回 Promise 对象', () => {
  it('fetchReturnPromise return test', () => {
    return http.fetchReturnPromise().then(res => {
      expect(res.data).toMatchObject({ code: 200 });
    });
  });
  it('fetchReturn403 return test', () => {
    // 如果请求成功的话就不会走 catch，但是测试依旧会通过
    // 因此需要加上下面一句，指定必须只能执行一次 expect
    expect.assertions(1);

    return http.fetchReturn403().catch(error => {
      expect(error.toString()).toEqual('Error: Request failed with status code 403');
    });
  });
});

describe('测试 return + resolves/rejects 方式, 被测试方法需返回 Promise 对象', () => {
  it('fetchReturnPromise return + resolves test', () => {
    return expect(http.fetchReturnPromise()).resolves.toMatchObject({ data: { code: 200 } });
  });
  it('fetchReturnPromise return + rejects test', () => {
    return expect(http.fetchReturn403()).rejects.toThrow();
  });
});

describe('测试 async + await 方式, 被测试方法需返回 Promise 对象', () => {
  it('fetchReturnPromise use async await test', async() => {
    const result = await http.fetchReturnPromise();
    expect(result.data).toMatchObject({ code: 200 });
  });
  it('fetchReturn403 use async await test', async() => {
    expect.assertions(1);
    try {
      await http.fetchReturn403();
    } catch (error) {
      expect(error.toString()).toMatch(/403/);
    }
  });
});

describe('fetchPostsList 测试套件', () => {
  test('测试 fetchPostsList 的回调函数能够调用', async () => {
    expect.assertions(1);
    let mockFn = jest.fn();
    await http.fetchPostsList(mockFn);

    // 断言mockFn被调用
    expect(mockFn).toBeCalled();
  });

})