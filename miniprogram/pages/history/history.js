// pages/history/history.js
import serv from './historyServ'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[
      {
        date:'2021-01-02',
        price:'10',
        status:false
      },
      {
        date:'2021-01-01',
        price:'9',
        status:true
      }
    ]
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
      let params = {
        username
      }
      const res = await serv.getHistoryPayment(params)
      console.log(res);
      that.setData({
        historyList:res.data
      })
    }catch(e){
      wx.showToast({
        title: e,
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