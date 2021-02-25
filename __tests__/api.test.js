import { fetchUser, fetchList } from '../src/api';

jest.mock('../src/api.js');

it('fetchUser测试', async() => {
  const data = await fetchUser();
  expect(data).toEqual({user: 'daiboy'});
});


it('fetchList测试', async() => {
  const data = await fetchList();
  expect(data).toEqual(['香蕉', '黄瓜']);
});