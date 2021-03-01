
import axios from 'axios';

export class Users {
  static all() {
    return axios.get('/users').then(res => res.data);
  }
}