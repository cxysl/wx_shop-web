import service from '../../service/shoppingCar_service.js';
import service1 from '../../service/order_service.js';
import service2 from '../../service/orderDetails_service.js';
import service3 from '../../service/goods_service.js';
const app = getApp();
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认全选
    obj: {name: "hello"},
    order:{},
    orderDetails:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let customerId = getApp().globalData.customerId;
    console.log(customerId)
    service.ShoppingCar_list('queryShoppingCarOneAll', { customerId: customerId })
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        this.setData({
          //填充数据
          hasList: true,
          carts: data
        })
      }).catch(err => {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 3000,
        })
      })

    // this.setData({
    //   hasList: true,
    //   carts: [
    //     { goodsId: 1, goodsDescribe: '新鲜芹菜 半斤', goodsPicture: 'http://101.200.144.60:9000/images/WX_img/qw.jpg', buyCount: 4, goodsPrice: 20.5, selected: true },
    //     { goodsId: 2, goodsDescribe: '素米 500g', goodsPicture: 'http://101.200.144.60:9000/images/WX_img/wifi.jpg', buyCount: 1, goodsPrice: 35.0, selected: true }
    //   ]
    // });

    this.getTotalPrice();

  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let goodsId = carts[index].goodsId    //商品ID
    console.log(goodsId)
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
    //改数据库
    let customerId = getApp().globalData.customerId;
    console.log(customerId)//获取顾客Id,
    console.log(index)
    
    service.ShoppingCar_delete('del_ShoppingCar?goodsId=' + goodsId + '&customerId=' + customerId, {})
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'suceess',
          duration: 3000,
        })
      }).catch(err => {
        wx.showToast({
          title: '失败成功',
          icon: 'none',
          duration: 3000,
        })
      })
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let buyCount0 = carts[index].buyCount;
    buyCount0 = buyCount0 + 1;
    carts[index].buyCount = buyCount0;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    
    //改数据库
    let customerId = getApp().globalData.customerId;
    console.log(customerId)//获取顾客Id,
    // const index = e.currentTarget.dataset.index;
    // let carts = this.data.carts;
    let goodsId = carts[index].goodsId    //商品ID
    let goodsPicture = carts[index].goodsPicture    //商品主图片
    let goodsPrice = carts[index].goodsPrice    //商品价格
    let goodsDescribe = carts[index].goodsDescribe    //商品描述信息
    let buyCount = 1;     //改购买数量（正加负减）
    console.log(goodsDescribe)
    service.ShoppingCar_add('add_ShoppingCar?customerId=' + customerId + '&buyCount=1', { goodsId: goodsId, goodsPicture: goodsPicture, goodsPrice: goodsPrice, buyCount: buyCount, goodsDescribe: goodsDescribe})
      .then(res => {
        let { code, data, message } = res;
        console.log(res)
        // this.setData({
        //   填充数据
        //   carts: data
        // })
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: 'none'
        })
      })
  },



  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let buyCount0 = carts[index].buyCount;
    if (buyCount0 <= 1) {
      return false;
    }
    buyCount0 = buyCount0 - 1;
    carts[index].buyCount = buyCount0;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();

    //改数据库
    let customerId = getApp().globalData.customerId;
    console.log(customerId)//获取顾客Id,
    // const index = e.currentTarget.dataset.index;
    // let carts = this.data.carts;
    let goodsId = carts[index].goodsId    //商品ID
    let goodsPicture = carts[index].goodsPicture    //商品主图片
    let goodsPrice = carts[index].goodsPrice    //商品价格
    let goodsDescribe = carts[index].goodsDescribe    //商品描述信息
    let buyCount = -1;     //改购买数量（正加负减）
    console.log(goodsDescribe)
    service.ShoppingCar_add('add_ShoppingCar?customerId=' + customerId + '&buyCount=-1', { goodsId: goodsId, goodsPicture: goodsPicture, goodsPrice: goodsPrice, buyCount: buyCount, goodsDescribe: goodsDescribe })
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
    // this.getTotalPrice();
  },


  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].buyCount * carts[i].goodsPrice;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

//下单
  buy(e){
    
    let carts = this.data.carts;
    //循环遍历选中的
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        console.log(i)
        let goodsId = carts[i].goodsId;//商品ID
        let goodsName = carts[i].goodsDescribe;//商品名称=商品描述信息
        let buyCount = carts[i].buyCount;//购买数量
        let goodsPrice = carts[i].goodsPrice;//商品售价
        
      //改库存
        service3.Goods_modify('Update_GoodsCount?id=' + goodsId + '&buyCount=' + buyCount, {})
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

      //添加到订单明细数组
        let list = this.data.orderDetails;
        list.push({ goodsId: goodsId, goodsName: goodsName, buyCount: buyCount,goodsPrice: goodsPrice})
        this.setData({
          orderDetails:list
        })
      }
    }
    console.log(this.data.orderDetails)

      let orderPrice = this.data.totalPrice;//订单总价
      let customerId = getApp().globalData.customerId;
      //添加到订单对象
      this.setData({                                // 最后赋值到data中渲染到页面
        order: { customerId: customerId, orderPrice: orderPrice}
      });

    //没选商品就下单
    if (orderPrice==0){
      wx.showToast({
        title: '请先添加商品',
        icon: 'none',
        duration: 3000,
      })
      return false;
    };

    console.log(this.data.order)
      //加订单
    service1.Order_add('add_Order',  this.data.order)
        .then(res => {
          let { code, data, message } = res;
          console.log(res)
          wx.showToast({
            title: '下单成功',
            icon: 'suceess',
            duration: 3000,
          })
          //加订单详情
          console.log(this.data.orderDetails)
          service2.OrderDetails_add('add_OrderDetails', this.data.orderDetails)
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
    console.log(this.data.orderDetails)
  }
})