// //logs.js
import service from '../../service/project_service.js';

Page({
  /* 页面的初始数据 */
  data: {
    curNav: 1,
    items: [],
    items2: [],
    items3: [],
    items4: [],
    value: ''
  },
  

  /* 把点击到的某一项 设为当前curNav   */
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    console.log(id);
    this.setData({
      curNav: id
    })
  },

  shoppingcar(){
    console.log(`here是点的购物车！`)
  },
  
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  
  //跳商品模糊查询页
  onClick:function() {
    
    console.log(this.data.value);
    wx.navigateTo({
      url: '/pages/two/query?value=' + this.data.value,
    })
  },  

//跳商品详情页
  onClick1: function (e) {
    console.log("进来了！")
    var id = e.currentTarget.dataset.goodsid
    console.log(id);
    wx.navigateTo({
      url: '/pages/one/goods_ details/goods_ details?goodsId=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    service.Product_list('queryUpGoodsTypeName', { typeName:'特步'})
      .then(res => {
        let { code, data, message } = res;
        this.setData({
          //填充数据
          items: data
        })
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: 'none'
        })
       })

    service.Product_list('queryUpGoodsTypeName', { typeName: '花花公子' })
      .then(res => {
        let { code, data, message } = res;
        this.setData({
          //填充数据
          items2: data
        })
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: 'none',
          duration: 3000,
        })
      })

    service.Product_list('queryUpGoodsTypeName', { typeName: '阿迪达斯' })
      .then(res => {
        let { code, data, message } = res;
        this.setData({
          //填充数据
          items3: data
        })
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: 'none',
          duration: 3000,
        })
      })

    service.Product_list('queryUpGoodsTypeName', { typeName: '李宁' })
      .then(res => {
        let { code, data, message } = res;
        this.setData({
          //填充数据
          items4: data
        })
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: 'none',
          duration: 3000,
        })
      })

      //卖出商品后改库存量
      // service.Product_modify("Update_GoodsCount?id=1&buyCount=2")
      // .then(res => {
      //   let { code, data, message } = res;
      //   console.log(data)
      // })
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
});