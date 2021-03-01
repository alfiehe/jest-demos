const { foo } = require('../src/module');

jest.mock('../src/module');

test('foo', () => {
  foo.mockImplementation(() => 42);

  expect(foo()).toBe(42);
  console.log(foo());
})