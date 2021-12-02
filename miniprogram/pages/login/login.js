// const { loginUser } = require('../../network/login.js')
import serv from './loginServ'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },

  // 登录事件
  async login(){
    let { username,password } = this.data
    if(!username || !password){
      return wx.showToast({
        title: '请输入完整信息',
        icon:'loading'
      })
    }
    let params = {
      username,
      password
    }
    // 登录请求
    try{
      const res = await serv.loginUser(params);
      console.log(res);
      wx.setStorageSync('token', res.token)
      wx.setStorageSync('username', res.username)
      wx.navigateBack({
        delta: 1,
      })
    }catch(e){
      console.log(e);
    }
    
  },
  
  // 跳转到注册页面事件
  toRegister(){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 输入框事件
   */
  username:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  password:function(e){
    this.setData({
      password:e.detail.value
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