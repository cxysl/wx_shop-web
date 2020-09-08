
// pages/userRegist/regist.js
import service from '../../service/user_login.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },

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

  },

  // 注册
  goRegist: function () {
    wx.navigateTo({
      url: '/pages/login/new_user/new_user',
    })
  },
 
//  登录
  doLogin: function (e) {
    var formObject = e.detail.value;
    var username = formObject.username;
    var password = formObject.password;

    if (username.length == 0 || password == 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 3000,
      })
    } else {
      service.User_list('CustomerLogin', { username: username, pwd: password})
        .then(res => {
          let { code, data, message } = res;
          console.log(res)

          if (code == 100000){
        //登录成功将用户ID存入全局变量中
            console.log(data)
            let { username, pwd, customerId } = data;
            console.log(customerId)
            app.globalData.customerId = customerId;
            console.log(`全局：`+getApp().globalData.customerId)
            wx.showToast({
              title: '用户登录成功',
              icon: 'suceess',
              duration: 3000,
            })
            wx.switchTab({
              url: '/pages/one/one'
            })
          } 
        }).catch(err => {
          let { code, data, message } = err;
          console.log(err);
          wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 3000,
          })
        })
    }
  }
})