// pages/mine/mine.js
import serv from './mineServ'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    name:'',
    mineSrc:'../../images/image/mine/Moon2.jpg'
  },

  //点击登录
  toLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
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
  onShow: async function () {
    let that = this
    let username = wx.getStorageSync('username')
    if(!username){
      return wx.showToast({
        title: '请登录',
        icon:'error'
      })
    }
    try{
      let params = { username }
      const {data} = await serv.getProfile(params)
      console.log(data);
      that.setData({
        name:data.nickname,
        status:1
      })
    }catch(e){
      wx.showToast({
        title: '请登录',
        icon:'error'
      })
    }
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