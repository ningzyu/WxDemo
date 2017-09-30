var mhttp = require('../../utils/myhttp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      itemdata:"",//请求的数据
      imgUrls: [],//轮播图片数组
      //屏幕宽高
      winWidth: 0,
      winHeight: 0,
      // tab切换  
      currentTab: 0,
      //tab标题
      tabtitles:[
        { "code": "01", "text": "产品特点" },
        { "code": "02", "text": "技术参数" },
        { "code": "03", "text": "视频展示" }
      ],
      videourl:"",//视频连接
      traits:[],//产品特点
      paralist:[],//
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    mhttp.fetchPost(mhttp.PosServlet, {itemid: options.id }, (err, res) => {
      wx.setNavigationBarTitle({
        title: res.name,
      })
      that.setData({
        itemdata: res,
        imgUrls: res.banners,
        videourl: res.video,
        traits: res.traits,
        paralist: res.paralist,
      });
    })
  // setTimeout(function () {
    //   that.setData({ hidden: true });
    // }, 300);
    // })
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }  
    })
  },
  /** 
       * 滑动切换tab 
       */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.index) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.index
      })
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