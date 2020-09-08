import { query, post, put, remove } from '../utils/request.js';

const ShoppingCar_list = (url, data) => query(url, data);
const ShoppingCar_add = (url, data) => post(url, data);
const ShoppingCar_modify = (url, data) => put(url, data);
const ShoppingCar_delete = (url, data) => remove(url, data);

module.exports = {
  ShoppingCar_list,
  ShoppingCar_add,
  ShoppingCar_modify,
  ShoppingCar_delete
}
