// pages/parking/parking.js
import serv from './parkingServ'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:23.452,
    longitude:113.494,
    markers:[
      {
        id:1,
        latitude:23.452,
        longitude:113.494,
        name:'停车场位置'
      }
    ],
    // 停车列表
    parkingList:[]
  },

  //点击搜索车位
  async search(e){
    let that = this
    let num = e.detail.value;
    //根据值请求接口
    try{
      const {dataArr} = await serv.searchParking(num);
      that.setData({
        parkingList:dataArr
      })
      console.log(dataArr);
    }catch(e){
      console.error(e);
    }
  },

  //点击打开地图导航
  openMap(){
    let that = this
    wx.openLocation({
      latitude: that.data.markers[0].latitude,
      longitude: that.data.markers[0].longitude,
      name:'要去的地方：物联网智慧停车场',
      address:"广州软件学院"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this
    wx.getLocation({
      type:'gcj02',
      success:function(res){
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      }
    })
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
    try{
      const {data} = await serv.getParking()
      console.log(data);
      that.setData({
        parkingList:data
      })
    }catch(e){
      console.log(e);
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