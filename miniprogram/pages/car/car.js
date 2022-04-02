// pages/car/car.js
import serv from './carServ'
import mqtt from '../../utils/mqtt'

const token = '50_53RqAqmlvM423q-CWSt6PK6G-pC65BEHI135T6Mvzb7hTVO2O0xVP-sQkltobQHYsJJDwbr41ofJSy7Y-1DXDDvBhhcJtGo4UFtA4-h8hvkPeMQHGnHylKIIMT_u0RGuYOi-nTjAIV0DVx2hRUUhAJACFF'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharImg:'',
    carSrc:'../../images/image/car/my-car.jpeg',
    carInfo:{},
    client:null,
    host:'broker.emqx.io:8084',
    topic:'topic/control',
    token:'',
    mqttOptions:{
      protocolVersion:4,
      clientId:'car_wechat',
      clean:true,
      username:'',
      password:'',
      reconnectPeriod:1000,
      connectTimeout:30 * 1000,
      resubscribe:true
    },
    parkTime:'',
    price:'',
    isCarLock:false
  },

  //mqtt连接
  connect(){
    this.data.client = mqtt.connect(`wxs://${this.data.host}/mqtt`,this.data.mqttOptions)
    this.data.client.on('connect',()=>{
      wx.showToast({
        title: '连接成功',
      })
    })
  },

  //mqtt订阅
  subscribe(){
    this.data.client.subscribe(this.data.topic)
    wx.showToast({
      title: '订阅成功',
    })
  },

  //mqtt道闸指令
  mqttLock(){
    try{
      this.data.client.publish(this.data.topic,'0')
      wx.showToast({
        title: '道闸成功',
      })
    }catch(e){
      console.log(e);
    }
  },

  //mqtt开锁指令
  mqttUnlock(){
    try{
      this.data.client.publish(this.data.topic,'1')
      wx.showToast({
        title: '开锁成功',
      })
    }catch(e){
      console.log(e);
    }
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
      this.mqttUnlock()
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
      this.mqttLock()
      await this.getCode()
      this.setData({
        isCarLock:true
      })
      console.log(res);
    }catch(e){
      console.log(e);
    }
  },

  //获取token
  getToken(){
    let that = this
    wx.request({
      url:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6edf9974c5b55549&secret=c344f0341550cf6689c33bf8e3e36273`,
      method:'get',
      success(res){
        if(res){
          console.log(res.data.access_token);
          that.setData({
            token:res.data.access_token
          })
          wx.showToast({
            title: '获取token成功',
          })
        }else{
          console.log('fail');
        }
      }
    })
  },

  //获取二维码 
  getCode(){
    //const cloud = require('wx-server-sdk')
    let that = this
    wx.request({
      url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${that.data.token}`,
      data:{
        scene:'car',
        page:'pages/car/car'
      },
      method:'post',
      header:{
        'content-type':'application/json'
      },
      responseType:'arraybuffer',
      success(res){
        if(res){
          let typeArray = new Uint8Array(res.data)
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
  onReady: async function () {
    await this.connect()
    console.log(this.data.client);
    await this.subscribe()
    this.getToken()
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
      if(res.err_code === 1){
        that.setData({
          carInfo:null
        })
      }
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