const filterByTerm = require('../src/filterByTerm');

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    const input = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' },
      { id: 3, url: 'https://www.link3.dev' }
    ];

    const output = [{ id: 3, url: 'https://www.link3.dev' }];

    expect(filterByTerm(input, 'link')).toEqual(output);

    expect(filterByTerm(input, 'LINK')).toEqual(output);

  });

  test("is should filter by a search term (uRl)", () => {
    const input = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' },
      { id: 3, url: 'https://www.link3.dev' }
    ];

    const output = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' }
    ];

    expect(filterByTerm(input, 'uRl')).toEqual(output);
  });

  test("is should throw when searchTerm is empty string", () => {
    const input = [];
    expect(() => filterByTerm(input, '')).toThrowError(Error('searchTerm cannot be empty'));
  });
  test("is should throw when inputArr is empty array", () => {
    const input = [];
    expect(() => filterByTerm(input, 'search')).toThrowError(Error('inputArr cannot be empty'));
  });
});
