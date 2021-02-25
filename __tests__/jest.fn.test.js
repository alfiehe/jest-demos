describe('jest.fn() 测试套件', () => {

  test('测试 jest.fn() 基本使用', () => {
    let mockFn = jest.fn(); // 创建 Mock 函数
    expect(mockFn(1, 2, 3)).toBeUndefined(); // 断言mockFn执行后返回undefined
    expect(mockFn).toBeCalled(); // 断言mockFn被调用
    expect(mockFn).toBeCalledTimes(1); // 断言mockFn被调用了一次
    expect(mockFn).toHaveBeenCalledWith(1, 2, 3); // 断言mockFn传入的参数为1,2,3
  })

  test('测试 jest.fn() 返回固定值', () => {
    let mockFn = jest.fn().mockReturnValue('default');
    expect(mockFn()).toBe('default'); // 断言mockFn执行后返回值为default
  })

  test('测试 jest.fn() 内部实现', () => {
    let mockFn = jest.fn((a, b) => { 
      return a * b; 
    });
    expect(mockFn(1, 3)).toBe(3); // 断言mockFn执行后返回3
    expect(mockFn(10, 10)).toBe(100); // 断言mockFn执行后返回100
  })

  test('测试 jest.fn() 返回Promise', async () => {
    let mockFn = jest.fn().mockResolvedValue('default');
    let result = await mockFn();

    // 断言mockFn通过await关键字执行后返回值为default
    expect(result).toBe('default'); 
    // 断言mockFn调用后返回的是Promise对象
    expect(Object.prototype.toString.call(mockFn())).toBe('[object Promise]'); 
  })

})
