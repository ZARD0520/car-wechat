// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine:{
      name:'ZARD抑郁的QQ',
      mineSrc:'../../images/image/mine/Moon2.jpg'
    },
  },

  //缴纳费用
  toPay(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  },

  //缴纳历史纪录
  toHistory(){
    wx.navigateTo({
      url: '../history/history',
    })
  },

  //联系客服
  contact(){
    wx.makePhoneCall({
      phoneNumber: '18602009490',
    })
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

  }
})