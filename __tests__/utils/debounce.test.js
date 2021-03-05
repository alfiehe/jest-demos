import debounce from '../../src/utils/debounce';

describe('debounce 函数测试', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });
  it('非立即执行回调测试', () => {
    const callback = jest.fn();
    const run = debounce(callback, 1000);

    run();

    // 这个时间点，回调函数还没有被调用。因为回调函数是定时 1000ms 后执行
    expect(callback).not.toBeCalled();

    // 快进⏩，直到所有计时器都执行完毕。（定时时间的快进功能）
    // jest.runAllTimers();
    jest.runOnlyPendingTimers();

    // 现在回调函数应该被调用了
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('case', (done) => {
    const callback = jest.fn();
    const run = debounce(callback, 1000);

    run();

    expect(callback).not.toBeCalled();

    setTimeout(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      done();
    }, 1000);
  });

  // test('延迟1000ms执行回调一次', () => {
  //   const callback = jest.fn();
  //   const run = debounce(callback, 1000);

  //   run();

  //   expect(callback).not.toHaveBeenCalled();

  //   jest.advanceTimersByTime(500);
  //   expect(callback).not.toHaveBeenCalled();

  //   // Fast-forward time
  //   jest.runAllTimers();
  //   // jest.runOnlyPendingTimers();

  //   expect(callback).toHaveBeenCalledTimes(1);
  // });

  // test('延迟执行回调，显示传入 immediate=false', () => {
  //   beforeEach(() => {
  //     jest.useFakeTimers();
  //   });
  //   const callback = jest.fn();
  //   const run = debounce(callback, 1000, false);

  //   run();

  //   expect(callback).not.toHaveBeenCalled();
  // });
  // test('立即执行回调一次', () => {
  //   beforeEach(() => {
  //     jest.useFakeTimers();
  //   });
  //   const callback = jest.fn();
  //   const run = debounce(callback, 1000, true);

  //   run();

  //   expect(callback).toHaveBeenCalledTimes(1);
  // });
  // test('clear', () => {
  //   beforeEach(() => {
  //     jest.useFakeTimers();
  //   });
  //   const callback = jest.fn();
  //   const run = debounce(callback, 1000, true);

  //   expect(run.clear()).toBeUndefined();
  // });
  // test('flush', () => {
  //   beforeEach(() => {
  //     jest.useFakeTimers();
  //   });
  //   const callback = jest.fn();
  //   const run = debounce(callback, 1000, true);

  //   expect(run.flush()).toBeUndefined();
  // });
});
