// pages/parking/parking.js
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
    parkingList:[
      {
        'id':1,
        'status':false
      },{
        'id':2,
        'status':true
      },{
        'id':3,
        'status':false
      },{
        'id':4,
        'status':false
      }
    ]
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
  onLoad: function (options) {
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