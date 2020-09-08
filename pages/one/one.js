//获取应用实例
const app = getApp()
import service from '../../service/project_service.js';

Page({
  data: {
    value: '',
    goodsId1:7,
  },
 
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onClick: function () {

    console.log(this.data.value);
    wx.navigateTo({
      url: '/pages/two/query?value=' + this.data.value,
    })
  },  

  onClick1:function(){
    console.log(this.data.goodsId1);
      wx.navigateTo({
        url: '/pages/one/goods_ details/goods_ details?goodsId=' + this.data.goodsId1,
      })
  },

  onLoad: function () {
    
  }
  
})

