import { query, post, put, remove } from '../utils/request.js';

const Customer_list = (url, data) => query(url, data);
const Customer_add = (url, data) => post(url, data);
const Customer_modify = (url, data) => put(url, data);
const Customer_delete = (url, data) => remove(url, data);

module.exports = {
  Customer_list,
  Customer_add,
  Customer_modify,
  Customer_delete
}
