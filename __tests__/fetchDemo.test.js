/**
 * 异步代码测试用例
 */
import { 
  fetchThenCallback,
  fetchReturnPromise,
  fetchReturn403
} from '../src/fetchDemo';

describe('1 使用 done() 测试', () => {
  it('fetchThenCallback done() test', (done) => {
    fetchThenCallback(data => {
      expect(data).toMatchObject({ code: 200 });
      done();
    });
  });
  it('fetchReturnPromise done() test', (done) => {
    fetchReturnPromise().then(response => {
      expect(response.data).toMatchObject({ code: 200 });
      done();
    });
  });
  it('fetchReturn403 done() test', (done) => {
    fetchReturn403().catch(error => {
      expect(error.toString()).toEqual('Error: Request failed with status code 403');
      expect(error.toString()).toMatch(/403/);
      done();
    });
  });
});

describe('2 使用 return 测试，如果返回 Promise 对象', () => {
  it('fetchReturnPromise return test', () => {
    return fetchReturnPromise().then(res => {
      expect(res.data).toMatchObject({ code: 200 });
    });
  });
  it('fetchReturn403 return test', () => {
    // 如果请求成功的话就不会走 catch，但是测试依旧会通过
    // 因此需要加上下面一句，指定必须只能执行一次 expect
    expect.assertions(1);

    return fetchReturn403().catch(error => {
      expect(error.toString()).toEqual('Error: Request failed with status code 403');
    });
  });
});

describe('3 使用 return + resolves/rejects 测试，如果返回 Promise 对象', () => {
  it('fetchReturnPromise return + resolves test', () => {
    return expect(fetchReturnPromise()).resolves.toMatchObject({ data: { code: 200 } });
  });
  it('fetchReturnPromise return + rejects test', () => {
    return expect(fetchReturn403()).rejects.toThrow();
  });
});

describe('4 使用 async + await 测试，如果返回 Promise 对象', () => {
  it('fetchReturnPromise use async await test', async() => {
    const result = await fetchReturnPromise();
    expect(result.data).toMatchObject({ code: 200 });
  });
  it('fetchReturn403 use async await test', async() => {
    expect.assertions(1);
    try {
      await fetchReturn403();
    } catch (error) {
      expect(error.toString()).toMatch(/403/);
    }
  });
});