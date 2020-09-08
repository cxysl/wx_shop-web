import { query, post, put, remove } from '../utils/request.js';

const GoodsPicture_list = (url, data) => query(url, data);
const GoodsPicture_add = (url, data) => post(url, data);
const GoodsPicture_modify = (url, data) => put(url, data);
const GoodsPicture_delete = (url, data) => remove(url, data);

module.exports = {
  GoodsPicture_list,
  GoodsPicture_add,
  GoodsPicture_modify,
  GoodsPicture_delete
}