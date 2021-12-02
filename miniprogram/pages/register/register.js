// pages/register/register.js
import serv from './registerServ'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        password:'',
        phone:'',
        nickname:'',
        carNum:''
    },

    async register(){
        let data = this.data
        if(!data.username || !data.password || !data.phone || !data.nickname || !data.carNum){
            return wx.showToast({
              title: '请输入完整信息',
              icon:'loading'
            })
        }
        let params = {
            username:data.username,
            password:data.password,
            phone:data.phone,
            nickname:data.nickname,
            carNum:data.carNum
        }
        // 注册请求
        try{
            const res = await serv.registerUser(params);
            console.log(res);
            wx.navigateBack({
                delta: 1,
            })
        }catch(e){
            console.log(e);
        }
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
    phone:function(e){
        this.setData({
            phone:e.detail.value
        })
    },
    nickname:function(e){
        this.setData({
            nickname:e.detail.value
        })
    },
    carNum:function(e){
        this.setData({
            carNum:e.detail.value
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