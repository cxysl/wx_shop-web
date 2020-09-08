import { query, post, put, remove } from '../utils/request.js';

const Order_list = (url, data) => query(url, data);
const Order_add = (url, data) => post(url, data);
const Order_modify = (url, data) => put(url, data);
const Order_delete = (url, data) => remove(url, data);

module.exports = {
  Order_list,
  Order_add,
  Order_modify,
  Order_delete
}