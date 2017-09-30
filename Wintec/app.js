//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 设备信息
    wx.getSystemInfo({
      success: function (res) {
        that.screenWidth = res.windowWidth;//屏幕宽度
        that.screenHeight = res.windowHeight;//屏幕高度
        that.brand = res.brand;//手机品牌
        that.model = res.model;//手机型号
        that.pixelRatio = res.pixelRatio;//设备像素比
        that.windowWidth = res.windowWidth;//可使用窗口宽度
        that.windowHeight = res.windowHeight;//可使用窗口高度
        that.language = res.language;//微信设置的语言
        that.version = res.version;//微信版本号
        that.system = res.system;//操作系统版本	
        that.platform = res.platform;//客户端平台	
        that.fontSizeSetting = res.fontSizeSetting;//用户字体大小设置
        that.SDKVersion = res.SDKVersion;//客户端基础库版本
      }
    });
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          // mhttp.fetchPost(mhttp.getopenid, { code: res.code }, (err, res) => {
          //   wx.setStorageSync('openid', res)
          // })
          //发起网络请求
          wx.request({
            // appid=wxa0850bac2300cffe & secret=db5ecf0a12e8ea06ca41c390e3554a87&js_code="+code+
		    //  "&grant_type=authorization_code
            // url: 'http://www.xixihaha.xin/WinTec/WinTecWeb?paratype=getopenid',
            method: 'POST',
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            header: { "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
            data: {
              appid: 'wxa0850bac2300cffe',
              secret: 'db5ecf0a12e8ea06ca41c390e3554a87',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success(res) {
              wx.setStorageSync('openid', res.data.openid)
            },
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
