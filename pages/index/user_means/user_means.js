// pages/index/user_means/user_means.js
import service from '../../../service/customer_service.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'true',
    user: {}
  },
  // false  true
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

//点击事件
//文本可编辑
  modify(){
    console.log(this.data.state)
    this.setData({
      //填充数据
      state: 'false'
    })
    console.log(this.data.state)
    this.onLoad()
  },
  // 更新个人信息
  update:function(e){
    console.log("运行了")
    var formObject = e.detail.value;
    var customerName = formObject.customerName;
    var customerSex = formObject.customerSex;
    var customerPhone = formObject.customerPhone;
    var customerAddress = formObject.customerAddress;

    if (customerName.length == 0 || customerPhone.length == 0 || customerAddress.length == 0) {
      wx.showToast({
        title: '请先填完必填项',
        icon: 'none',
        duration: 3000,
      })
    } else{
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let customerId = getApp().globalData.customerId;
      service.Customer_modify('Update_Customer?id=' + customerId, { customerName: customerName, customerSex: customerSex, customerPhone: customerPhone, customerAddress: customerAddress})
        .then(res => {
          let { code, data, message } = res;
          console.log(res)

          if (code == 100000) {
            console.log("顾客信息修改成功")
            wx.showToast({
              title: '信息修改成功',
              icon: 'suceess',
              duration: 3000,
            })
          }
        }).catch(err => {
          let { code, data, message } = err;
          console.log(err);
          wx.showToast({
            title: '信息修改失败',
            icon: 'none',
            duration: 3000,
          })
        })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    console.log("运行")
    let customerId = getApp().globalData.customerId;
    console.log(customerId)
    if (customerId.length != 0) {
      service.Customer_list('queryOneCustomer', { customerId: customerId })
        .then(res => {
          let { code, data, message } = res;
          console.log(res)
          this.setData({
            //填充数据
            user: data
          })
        }).catch(err => {
          let { code, data, message } = err;
          console.log(err)
        })
    } else {    //防止万一没登录
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }

  },
  out(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
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