import { myMap } from '../src/myMap';

describe('myMap test', () => {

  // 传统思维测试
  it('test', () => {
    const fn = item => item * 2;
    expect(myMap([1, 2, 3], fn)).toEqual([2, 4, 6]);
  });

  it('test jest.fn()', () => {
    // 通过jest.fn声明的函数可以被追溯
    const fn = jest.fn(item => item * 2);
    expect(myMap([5,15,25], fn)).toEqual([10,30,50]);
    // fn 调用了 3 次
    expect(fn.mock.calls.length).toBe(3);
    // 每次函数返回的值是 10,30,50
    expect(fn.mock.results.map(e => e.value)).toEqual([10,30,50]);
    console.log('fn===', fn.mock);
  });

});
