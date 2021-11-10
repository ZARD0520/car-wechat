// pages/car/car.js
const token = '50_53RqAqmlvM423q-CWSt6PK6G-pC65BEHI135T6Mvzb7hTVO2O0xVP-sQkltobQHYsJJDwbr41ofJSy7Y-1DXDDvBhhcJtGo4UFtA4-h8hvkPeMQHGnHylKIIMT_u0RGuYOi-nTjAIV0DVx2hRUUhAJACFF'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharImg:'',
    carSrc:'../../images/image/car/my-car.jpeg',
    myCar:{
      status:true,
      isBlock:false,
      no:'粤A66666',
      time:10,
      price:'2'
    }
  },


  //解锁
  unLock(){
    this.setData({
      myCar:{
        status:true,
        isBlock:false,
        no:'粤A66666',
        time:10,
        price:'2'
      }
    })
  },
  //道闸
  Lock(){
    this.getCode()
    this.setData({
      myCar:{
        status:true,
        isBlock:true,
        no:'粤A66666',
        time:10,
        price:'2'
      }
    })
  },

  //获取二维码 
  getCode(){
    //const cloud = require('wx-server-sdk')
    let that = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+token,
      method:'post',
      data:{
        path:'../pay/pay',
        width:400
      },
      header:{
        'content-type':'application/json'
      },
      responseType:'arraybuffer',
      success(res){
        if(res){
          console.log(res);
          console.log(wx.arrayBufferToBase64(res.data));
          that.setData({
            sharImg:wx.arrayBufferToBase64(res.data)
          })
        }else{
          wx.showToast({
            title: '失败',
            duration: 0,
            mask: true,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = this.data.myCar.isBlock
    if(status){
      this.getCode()
    }
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