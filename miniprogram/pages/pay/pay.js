import serv from './payServ'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum:'',
    pay:{
    }
  },

  //缴费
  async pay(){
    let carNum = this.data.carNum
    if(!carNum){
      return wx.showToast({
        title: '请登录',
        icon:'error'
      })
    }
    // 缴费请求
    try{
      let params = {
        carNum
      }
      const res = await serv.onPay(params)
      console.log(res.data);
    }catch(e){
      wx.showToast({
        title: e,
        icon:'error'
      })
    }
    wx.navigateBack({
      delta: 1,
    })
  },

  //返回
  back(){
    wx.navigateBack({
      delta: 1,
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
      let params = {
        username
      }
      const res = await serv.getPayment(params)
      console.log(res);
      that.setData({
        pay:res.data[0],
        carNum:res.data[0].carNum
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