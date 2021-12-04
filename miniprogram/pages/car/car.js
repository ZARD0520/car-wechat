// pages/car/car.js
import serv from './carServ'

const token = '50_53RqAqmlvM423q-CWSt6PK6G-pC65BEHI135T6Mvzb7hTVO2O0xVP-sQkltobQHYsJJDwbr41ofJSy7Y-1DXDDvBhhcJtGo4UFtA4-h8hvkPeMQHGnHylKIIMT_u0RGuYOi-nTjAIV0DVx2hRUUhAJACFF'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharImg:'',
    carSrc:'../../images/image/car/my-car.jpeg',
    carInfo:{},
    parkTime:'',
    price:'',
    isCarLock:false
  },

  //时间转换、获取价格
  changeTime(time){
    let that = this
    let nowDate = new Date()
    let date = new Date(parseInt(time))
    // 获取毫秒数并相减
    let nowTime = nowDate.getTime()
    let dateTime = date.getTime()
    let parkTime = nowTime-dateTime
    let changeParkTime = parseInt(parkTime / 60000)
    // 转换价格公式
    let price = parseInt(parkTime/60000 < 30 ? 0 : parkTime/1000000)
    that.setData({
      parkTime:changeParkTime.toString(),
      price:price.toString()
    })
  },

  //解锁
  async unLock(){
    let username = wx.getStorageSync('username')
    let params = {
      username
    }
    //接口请求
    try{
      const res = await serv.setUnLock(params)
      console.log(res);
      this.setData({
        isCarLock:false
      })
    }catch(e){
      console.log(e);
    }
  },
  //道闸
  async Lock(){
    let username = wx.getStorageSync('username')
    let params = {
      username
    }
    //接口请求
    try{
      const res = await serv.setLock(params)
      console.log(res);
      await this.getCode()
      this.setData({
        isCarLock:true
      })
    }catch(e){
      console.log(e);
    }
  },

  //获取二维码 
  getCode(){
    //const cloud = require('wx-server-sdk')
    let that = this
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+token,
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
          let typeArray = new Uint8Array(res.data)
          console.log('data:image/jpg;base64,'+wx.arrayBufferToBase64(typeArray));
          console.log(res.data);
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
    let status = this.data.carInfo?.isLock
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
      const res = await serv.getLockStatus(params)
      console.log(res);
      this.changeTime(res.data.startTime)
      that.setData({
        carInfo:res.data.carInfo
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