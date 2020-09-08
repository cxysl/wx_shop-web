import { query, post, put, remove } from '../utils/request.js';

const User_list = (url, data) => query(url, data);
const User_add = (url, data) => post(url, data);
const User_modify = (url, data) => put(url, data);
const User_delete = (url, data) => remove(url, data);

module.exports = {
  User_list,
  User_add,
  User_modify,
  User_delete
}
