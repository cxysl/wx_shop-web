import { query, post, put, remove } from '../utils/request.js';

const Goods_list = (url, data) => query(url, data);
const Goods_add = (url, data) => post(url, data);
const Goods_modify = (url, data) => put(url, data);
const Goods_delete = (url, data) => remove(url, data);

module.exports = {
  Goods_list,
  Goods_add,
  Goods_modify,
  Goods_delete
}