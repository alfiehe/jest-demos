import axios from 'axios';
import { Users } from '../src/jestMockDemo';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Daiboy'}];
  const res = { data: users };
  axios.get.mockResolvedValue(res);

  return Users.all().then(data => expect(data).toEqual(users));
})