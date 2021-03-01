/**
 * jest.fn() 使用测试
 */

 test('基本使用', () => {
  // 创建 mock 函数
  const mockFn = jest.fn();

  // 断言 mockFn 执行后返回 undefined
  expect(mockFn(1, 2, 3)).toBeUndefined(); 
  // 断言 mockFn 被调用
  expect(mockFn).toBeCalled();
  // 断言 mockFn 被调用了 1 次
  expect(mockFn).toBeCalledTimes(1);
  // 断言 mockFn 传入的参数为 1,2,3
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3);
})

test('返回固定值', () => {
  const mockFn = jest.fn().mockReturnValue('daiboy');

  // 断言 mockFn 执行后返回值为 daiboy
  expect(mockFn()).toBe('daiboy'); 
})

test('在测试期间注入返回值', () => {
  const mockFn = jest.fn();
  console.log('mockFn ===', mockFn());

  mockFn
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('daidai')
    .mockReturnValue(true);
  console.log('mockFn testing ===', mockFn(), mockFn(), mockFn(), mockFn());
})

test('传入函数', () => {
  const mockFn = jest.fn((a, b) => a * b );

  // 断言 mockFn 执行后返回 3
  expect(mockFn(1, 3)).toBe(3);
  // 断言 mockFn 执行后返回 100
  expect(mockFn(10, 10)).toBe(100);
})

test('返回 Promise', async () => {
  const mockFn = jest.fn().mockResolvedValue('feifei');
  const result = await mockFn();

  // 断言函数执行后返回值为 feifei
  expect(result).toBe('feifei'); 
  // 断言函数调用后返回 Promise 对象
  expect(Object.prototype.toString.call(mockFn())).toBe('[object Promise]'); 
})

test('.mock 属性测试 this 指向', () => {
  const mockFn = jest.fn();

  const a = new mockFn();
  const b = {};
  const bound = mockFn.bind(b);
  bound();

  console.log('mockFn.mock ===\n', mockFn.mock); 
});