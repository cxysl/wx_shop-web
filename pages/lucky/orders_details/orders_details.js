// pages/lucky/orders_details/orders_details.js
import service from '../../../service/orderDetails_service.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // OrderDetails
    od: [],
    orderId:'',
    p:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId
    console.log(orderId)
    this.setData({
      orderId: orderId
    });
    console.log(`接收到的订单号:`+this.data.orderId);

    this.query()
  },

 //查看该订单的订单详情
  query(){
    service.OrderDetails_list('queryAllOrderDetails', { orderId: this.data.orderId })
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        
        this.setData({
          od: data[0],
          p:data[1]
        })
        console.log(`od:`+this.data.od)
        console.log(`p:`+this.data.p)
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