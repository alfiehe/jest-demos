const fn = require('../src/fn');

test('forEach test', () => {

  // 创建mock函数 mockFn
  const mockFn = jest.fn(item => item + 10);

  // 执行被测函数 fn.forEach
  fn.forEach([0, 1], mockFn);

  // 打印 mock 属性
  console.log('mockFn.mock ===\n', mockFn.mock); 

  // 断言 mockFn 执行了 2 次
  expect(mockFn.mock.calls.length).toBe(2);

  // 断言 第1次调用函数时的第一个参数是 0
  expect(mockFn.mock.calls[0][0]).toBe(0);

  // 断言 第2次调用函数时的第一个参数是 1
  expect(mockFn.mock.calls[1][0]).toBe(1);

  // 断言 第1次函数调用的返回值是 10
  expect(mockFn.mock.results[0].value).toBe(10);

  // 断言 第2次函数调用的返回值是 11
  expect(mockFn.mock.results[1].value).toBe(11);

});
