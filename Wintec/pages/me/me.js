// pages/me/me.js
let app = getApp();
var mhttp = require('../../utils/myhttp.js');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},//用户信息
    zxing:'',
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前微信账户信息
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    });
    // path	String		不能为空，最大长度 128 字节
    // width	Int	430	二维码的宽度
    // auto_color	Bool	false	自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
    // line_color	Object	{"r":"0", "g":"0", "b":"0" } auth_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx", "g":"xxx", "b":"xxx" }

    // mhttp.fetchPost(mhttp.wxzxing, { path: '/page/me/me', }, (err, res) => {
    //   if (res) {
    //     that.setData({
    //       zxing:res.data,
    //     });
    //   } else {
    //     that.setData({
    //       zxing:"",
    //     });
    //   }

    // });
  },

  /**ckdg
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