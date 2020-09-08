// pages/two/query.js
import service from '../../service/project_service.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    queryitems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = options.value
    console.log(value)
    this.setData({
      value: value
    });
    console.log(this.data.value);

   this.onClick()
  },

  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onClick(){
    service.Product_list('queryUpGoodsStrAll', { goodsStr: this.data.value })
      .then(res => {
        let { code, data, message } = res;
        this.setData({
          //填充数据
          queryitems: data
        })
      }).catch(err => {
        wx.showToast({
          title: '搜索失败',
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