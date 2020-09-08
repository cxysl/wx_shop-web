// pages/login/new_user/new_user.js

import service from '../../../service/user_login.js';
Page({
  data: {
    // focus: false,
    // inputValue: ''
  },
// 登录
  doLogin: function (e) {
    var formObject = e.detail.value;
    var username = formObject.username;
    var password = formObject.password;
    var customerName = formObject.customerName;
    var customerSex = formObject.customerSex;
    var customerPhone = formObject.customerPhone;
    var customerAddress = formObject.customerAddress;
    var customerPicture = formObject.customerPicture;


    if (username.length == 0 || password.length == 0 || customerName.length == 0 || customerPhone.length == 0 || customerAddress.length == 0) {
      wx.showToast({
        title: '请先填完必填项',
        icon: 'none',
        duration: 3000,
      })
    } else {
      //先加顾客信息
      service.User_add('add_Customer', { customerName:customerName, customerSex: customerSex, customerPhone: customerPhone, customerAddress: customerAddress, customerPicture: customerPicture })
        .then(res => {
          let { code, data, message } = res;
          console.log(res)

          if (code == 100000) {
            console.log("顾客个人信息注册成功")
      //再加顾客账号
            service.User_add('add_CustomerLogin', { username: username, pwd: password })
              .then(res => {
                let { code, data, message } = res;
                console.log(res)

                if (code == 100000) {
                  console.log("顾客账号信息注册成功")
                  wx.showToast({
                    title: '注册成功',
                    icon: 'suceess',
                    duration: 3000,
                  })
                  wx.navigateTo({
                    url: '/pages/login/login'
                  })
                }
              }).catch(err => {
                let { code, data, message } = err;
                console.log(err);
                wx.showToast({
                  title: '注册失败',
                  icon: 'none',
                  duration: 3000,
                })
              })

          }
        }).catch(err => {
          let { code, data, message } = err;
          console.log(err);
        })
      

    }
  }
})