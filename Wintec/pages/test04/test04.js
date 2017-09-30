var app = getApp();
var mhttp = require('../../utils/myhttp.js');
Page({
  data: {

    //tab标题
    tabtitles: [
      { "code": "01", "text": "技术文档" },
      { "code": "02", "text": "驱动下载" },
      { "code": "03", "text": "技术支持" }
    ],
    currentTab: 0,//tab指针
    // curNav: 1,
    wordIndex: 0,//文档指针
    driveIndex: 0,//驱动指针
    hidden: true,//是否隐藏加载条
    //屏幕宽高
    pixelRatio: app.pixelRatio,
    winWidth: app.windowWidth,//图片大小
    winHeight: app.windowHeight - app.windowWidth / 750 * 80,
    onlines:[
      { "name": "客服" },
      { "name": "留言" },
      { "name": "反馈" },
      { "name": "电话" },
    ],
  },
  // 初始化
  onLoad: function (options) {
    var that = this;
    
    mhttp.fetchGet(mhttp.SkillWord, (err, res) => {
      that.setData({
        // docdata: res.wtypes,
        docdata:res.data,
        // drivedata: res.wtypes2,
        drivedata: res.drivedata,
      })
    })
    
  },
  // 滑动切换
  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      currentTab: current,
    });
  },
  // 点击切换tab
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab == e.target.dataset.index) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.index
      })
    }
  },
//事件处理函数
  wordchangeTab: function (e) {
    let id = e.target.dataset.id
    this.setData({
      wordIndex: id
    })
  },
  drivechangeTab: function (e) {
    let id = e.target.dataset.id
    this.setData({
      driveIndex: id
    })
  },

  // 打开文档
  download: function (e) {
    var that = this;
    var downloads= e.currentTarget.dataset.downloads;
    console.log(downloads)
    setTimeout(function () {
      that.setData({ hidden: false });
    }, 300);
    wx.downloadFile({
      url: downloads,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
            that.setData({
            hidden: true,
            });
          }
        })
      }
    })

  },
  
})