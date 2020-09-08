// pages/one/goods_details/goods_details.js
const app = getApp()
import service from '../../../service/goods_service.js';
import service2 from '../../../service/goodsPicture_service.js';
import service3 from '../../../service/shoppingCar_service.js';
import service4 from '../../../service/order_service.js';
import service5 from '../../../service/orderDetails_service.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:'',
    goods:{},
    goodsPicture:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsId = options.goodsId
    console.log(goodsId)
    this.setData({
      goodsId: goodsId
    });
    console.log(this.data.goodsId);

    this.query()
  },

  query(){
    service.Goods_list('getGoodsOne', { goodsId: this.data.goodsId })
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        this.setData({
          //填充数据
          goods: data
        })
      }).catch(err => {
        let { code, data, message } = err;
        console.log(err)
        wx.showToast({
          title: err.message,
          icon: 'none'
        })
      })

    service2.GoodsPicture_list('queryOneGoodsPicture', { goodsId: this.data.goodsId })
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        this.setData({
          //填充数据
          goodsPicture: data
        })
      }).catch(err => {
        let { code, data, message } = err;
        console.log(err)
        wx.showToast({
          title: err.message,
          icon: 'none'
        })
      })
  },
  //加入购物车
  addShoppingCar(){
    let goods = this.data.goods;
    let goodsId = goods.goodsId;    //商品ID
    let goodsPicture = goods.goodsPicture;    //商品图片
    let goodsPrice = goods.goodsPrice;    //商品价格
    let buyCount = 1;    //购买数量
    let goodsDescribe = goods.goodsDescribe;    //描述信息
    let customerId = getApp().globalData.customerId;
    console.log(customerId)//获取顾客Id,
    service3.ShoppingCar_add('add_ShoppingCar?customerId=' + customerId + '&buyCount=' + buyCount, { goodsId: goodsId, goodsPicture: goodsPicture, goodsPrice: goodsPrice, buyCount: buyCount, goodsDescribe: goodsDescribe})
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        wx.showToast({
          title: '添加成功',
          icon: 'suceess',
          duration: 3000,
        })
      }).catch(err => {
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 3000,
        })
      })
  },
  //立即购买
  buy(){
    let goods = this.data.goods;
    let goodsId = goods.goodsId;    //商品ID
    let goodsPicture = goods.goodsPicture;    //商品图片
    let goodsPrice = goods.goodsPrice;    //商品价格
    let buyCount = 1;    //购买数量
    let goodsDescribe = goods.goodsDescribe;    //描述信息
    let customerId = getApp().globalData.customerId;
    console.log(customerId)//获取顾客Id,
  
    //改库存
    service.Goods_modify('Update_GoodsCount?id=' + goodsId + '&buyCount=' + buyCount, {})
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        // this.setData({
        //   //填充数据
        //   carts: data
        // })
      }).catch(err => {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 3000,
        })
      })

    //加订单
    service4.Order_add('add_Order', { customerId: customerId, orderPrice: goodsPrice })
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        wx.showToast({
          title: '下单成功',
          icon: 'suceess',
          duration: 3000,
        })
        //加订单详情
        service5.OrderDetails_add('add_OrderDetails', [{ goodsId: this.data.goods.goodsId, goodsName: this.data.goods.goodsName, buyCount: 1, goodsPrice: this.data.goods.goodsPrice }])
          .then(res => {
            let { code, data, message } = res;
            console.log(res)
            this.setData({
              orderDetails: []
            })
          }).catch(err => {
            wx.showToast({
              title: err.message,
              icon: 'none',
              duration: 3000,
            })
          })
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: 'none',
          duration: 3000,
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})