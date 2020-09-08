//index.js
//获取应用实例
const app = getApp()
import service from '../../service/customer_service.js';

Page({
  data: {
    user:{}
  },

// 点击事件 
// 查看用户个人信息
  user_Means(){
    wx.navigateTo({
      url: '/pages/index/user_means/user_means',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    console.log("运行")
    let customerId = getApp().globalData.customerId;
    console.log(customerId)
    if (customerId.length!= 0){
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
          wx.showToast({
            title: err.message,
            icon: 'none'
          })
        })
    }else{    //防止万一没登录
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    
  },
  query_order(){
    wx.navigateTo({
      url: '/pages/lucky/orders/orders',
    })
  }
})
