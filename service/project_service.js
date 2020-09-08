import { query, post, put, remove } from '../utils/request.js';

const Product_list = (url, data) => query(url, data);
const Product_add = (url, data) => post(url, data);
const Product_modify = (url, data) => put(url, data);
const Product_delete = (url, data) => remove(url, data);

module.exports = {
  Product_list,
  Product_add,
  Product_modify,
  Product_delete
}
