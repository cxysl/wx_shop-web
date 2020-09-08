import { query, post, put, remove } from '../utils/request.js';

const OrderDetails_list = (url, data) => query(url, data);
const OrderDetails_add = (url, data) => post(url, data);
const OrderDetails_modify = (url, data) => put(url, data);
const OrderDetails_delete = (url, data) => remove(url, data);

module.exports = {
  OrderDetails_list,
  OrderDetails_add,
  OrderDetails_modify,
  OrderDetails_delete
}