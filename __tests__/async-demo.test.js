import { getDataCallback, getDataPromise } from '../src/asyncDemo';
describe('async 异步测试套件', () => {

  it('异步测试 Callback done()', (done) => {
    getDataCallback(data => {
      expect(data).toBe('feifei');
      done();
    });
  });

  it('异步测试 Promise done()', (done) => {
    getDataPromise().then(res => {
      expect(res).toBe('daiboy');
      done();
    });
  });

  it('异步测试 Promise return', () => {
    return getDataPromise().then(res => {
      expect(res).toBe('daiboy');
    });
  });

  it('异步测试 Promise async + await', async() => {
    const result = await getDataPromise();
    expect(result).toBe('daiboy');
  });

  it('异步测试 Promise return + resolves/rejects', () => {
    return expect(getDataPromise()).resolves.toBe('daiboy');
  });

});
