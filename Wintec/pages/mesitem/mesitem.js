// pages/mesitem/mesitem.js
var mhttp = require('../../utils/myhttp.js');
var util = require('../../utils/util.js');
let app = getApp();
const imgtions = ['album.png', 'camera.png', 'video.png', 'location.png'];

const clickBinds = ['tionalbum', 'tioncamera', 'tionvideo', 'tionlocation'];

Page({
  data: {
    imageWidth: (app.screenWidth- app.screenWidth/72*10)/4-10,//图片大小

    ispop:true,//视屏对话框是否隐藏
    video:"",///视屏路径
    isoption:true,//是否显示添加多媒体列表
    imgtions: imgtions,//图标集合
    clickBinds: clickBinds,//事件集合
    subimages:[],//将提交的图片集合
    subvideo:"",//将提交的视频路径
    meslist:[],//数据集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    app.getUserInfo(userInfo => {
      that.setData({
        userInfo: userInfo
      })
    });
    mhttp.fetchPost(mhttp.MURL + '/WinTecWeb', { paratype: 'Message', newid: id  }, (err, res) => {
        that.setData({
          meslist: res,
        });
    });
  },
  toImage: function (e) {
    var murl = e.currentTarget.dataset.url;
    wx.previewImage({
      current: murl,
      urls:[murl]
    });
  },
  //点击视屏图片
  playvideo: function (e) {
    var vpath = e.currentTarget.dataset.url;
    var that=this;
    that.setData({
      video: vpath,
      ispop:false,
    })
    wx.createVideoContext('myVideo').play()
  },
  //取消
  cancel: function () {
    this.setData({
      ispop: true
    });
    wx.createVideoContext('myVideo').pause()
  },
  // 加号点击事件
  totion: function () {
    var that = this;
    var option= this.data.isoption;
    if (option){
      that.setData({
        isoption: false
      });
    }else{
      that.setData({
        isoption: true
      });
    }
  },
  //相册
  tionalbum: function () {
    var that = this;
    that.chooseWxImage('album')
  },
  //拍照
  tioncamera: function () {
    var that = this;
    that.chooseWxImage('camera')
  },
  //相机相册
  chooseWxImage: function (type) {
    let that = this;
    var i = 3 - this.data.subimages.length;
    if(i>0){
      wx.chooseImage({
        count: i,
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: function (res) {
          that.setData({
            subimages: that.data.subimages.concat(res.tempFilePaths)
          })
        }
      })
    }else{
      // 提示用户超出限制
    }
  },
  //视频
  tionvideo: function () {
    var that = this;
    wx.chooseVideo({
      sourceType: [ 'camera'],
      maxDuration: 10,
      camera: 'back',
      success: function (res) {
        that.setData({
          subvideo: res.tempFilePath,
        })
      }
    })
  },
  //定位
  tionlocation: function () {
    var that = this;
  },
  //发送
  confirm: function () {
    var that = this;
    that.setData({
      meslist: that.data.meslist.concat({
        "content": "售前咨询公司有哪些产品",
        "data": util.formatTime(new Date),
        "imgs": that.data.subimages,
        "mestype": 2,
        "newId": 1001,
        "notread": 1,
        "openid": "ogucB0bNuyW99qJCq5DLpC0UQS4A",
        "video": that.data.subvideo
      }),
      // 这里进行上传操作
      subimages:[],
      subvideo:"",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.videoContext = wx.createVideoContext('myVideo')
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