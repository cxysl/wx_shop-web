// pages/lucky/orders/orders.js
import service from '../../../service/order_service.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: false,          // 列表是否有数据
    orders:[]      //
  },

//订单详情
  onClick1: function (e) {
    console.log("进来了！")
    var id = e.currentTarget.dataset.orderid
    console.log(`订单ID:`+id);
    wx.navigateTo({
      url: '/pages/lucky/orders_details/orders_details?orderId=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //查该顾客的订单记录
    let customerId = getApp().globalData.customerId;
    service.Order_list('queryAllOrder', {customerId: customerId})
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        this.setData({
          //填充数据
          hasList: true,
          orders: data
        })
      }).catch(err => {
        wx.showToast({
          title: '加载失败',
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