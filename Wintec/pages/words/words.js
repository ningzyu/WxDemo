var that;
let app = getApp();
var mhttp = require('../../utils/myhttp.js');
Page({
  data: {
    listTab: [
      { "code": "01", "text": "智能POS" },
      { "code": "02", "text": "商业POS" },
      { "code": "03", "text": "触控POS" },
      { "code": "04", "text": "自助POS" },
      { "code": "05", "text": "POS秤" },
      { "code": "06", "text": "智能印章" }
    ],
    winHeight: app.screenHeight,//窗口高度
    curIndex: 0,
    curText: null,
    scrollLength: 0,
    hidden: false,//是否显示加载条
  },
  onLoad: function () {
    console.log('onLoad')
    
    this.initData(0)
  },
  //初始化数据
  initData: function (index) {
    var that = this
    mhttp.fetchGet(mhttp.SkillWord, (err, res) => {
      //更新数据
      that.setData({
        posList: res.wtypes[index].words
      });

      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
    })
    that.setData({
      curIndex: index,
      hidden: false,
    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    var index = e.detail.current
    that.setData({ curIndex: index });
    //移动view位置，改变选中颜色
    this.initData(index)
  },
  //tab点击事件，刷新数据
  swichNav: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index
    //移动滚动条,//200和35是我估算的
    if (index > this.data.curIndex) {
      if (that.data.scrollLength < 200) {
        this.setData({
          scrollLength: that.data.scrollLength + 55 * (index - that.data.curIndex)
        })
      }
    } else {
      if (that.data.scrollLength > 0) {
        this.setData({
          scrollLength: that.data.scrollLength - 55 * (that.data.curIndex - index)
        })
      }
    }
    //移动view位置，改变选中颜色
    this.initData(index)
  },

  // onDownloads: function (event) {
  //   const downloadTask = wx.downloadFile({
  //     url: event.currentTarget.dataset.path, //仅为示例，并非真实的资源
  //     success: function (res) {
  //       var tempFilePaths = res.tempFilePath
  //       // wx.playVoice({
  //       //   filePath: res.tempFilePath
  //       // })
  //       wx.saveFile({
  //         tempFilePath: tempFilePaths,
  //         success: function (res) {
  //           wx.showToast({
  //               title: res.savedFilePath,
  //           })
  //         }
  //       })  
  //     }
  //   })
  //   downloadTask.onProgressUpdate((res) => {
  //     console.log('下载进度', res.progress)
  //     console.log('已经下载的数据长度', res.totalBytesWritten)
  //     console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
  //   })

  //   downloadTask.abort() // 取消下载任务

  // }
})