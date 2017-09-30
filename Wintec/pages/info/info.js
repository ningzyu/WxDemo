var that;
var animation;
let app = getApp();
var address = require('../../utils/city.js');
const PopItems = ['拍照', '选择照片', '选择视频'];
const clickBinds = ['chooseCamera', 'chooseAlbum', 'chooseVideo'];
import { validate, validateRequired } from '../../utils/validate'
Page({
  data: {
    
    images: [], //上传图片列表
    isvideo: false,  //是否显示视屏
    videosrc:"",//视频路径
    imageWidth: app.screenWidth / 4 - 10,//图片大小
    // 点击`图片`tab的action-sheet
    isPop: true,
    //弹出窗口项
    PopItems: PopItems,
    // 弹出窗口点击事件列表
    clickBinds: clickBinds,
    clientName:"",//客户
    contactsName:"",//联系人
    phone:"",//手机号
    location:"",//地址
    model:"",//机型
    code:"",//序列号
    content:"",//内容
  },
  //初始化数据
  onLoad: function (options) {
    
    that = this;
    //定位
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        // var speed = res.speed
        // var accuracy = res.accuracy
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: latitude + "," + longitude,
            key: "J6VBZ-RPQKW-SHERS-RM4OI-HLHLF-7ABTN",
          },
          success(res) {
            that.setData({
              location: res.data.result.address
            });
          }
        })
      }
    })
  },
  // 表单验证
  validate(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
    validate(e, this)
  },
  scan: function(){
    var that = this;
    wx.scanCode({
      // onlyFromCamera: true,//是否只允许相机扫码
      success: (res) => {
        console.log(res)
        that.setData({
          code: res.result,//所扫码的内容
          // scanType: res.scanType,//所扫码的类型
          // charSet: res.charSet,//所扫码的字符集
          // path: res.path,//当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
        })
      }
    })
  },

  
  /**
   * 图片选择模块
   */
  // 点击多媒体插入按钮
  mediaTouch() {
    this.setData({
      isPop: false,
      isvideo: false,
    });
  },
  popChange(event) {
    this.setData({
      isPop: true,
    })
  },
   //相册
  
  chooseAlbum: function () {
	  let that = this;
    that.chooseWxImage('album')
  },
 //相机
  chooseCamera: function () {
    let that = this;
    that.chooseWxImage('camera')
  },
  //视屏
  chooseVideo: function () {
	var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 10,
      camera: 'back',
      success: function (res) {
        that.setData({
          isPop: true,
          videosrc: res.tempFilePath,
          isvideo:true,
        })
      }
    })
  },
  //相机相册
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        if (that.data.videosrc!=""){
          that.setData({
            isvideo: true,
          })
        }
        that.setData({
          isPop: true,
          images: that.data.images.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewImage: function (e) {
    var murl = e.currentTarget.dataset.url;
    // 预览图集
    wx.previewImage({
      current: murl,
      urls: that.data.images
    });
  },
  //删除
  delete: function (e) {
    var index = e.currentTarget.dataset.index;
    var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },

  editImage: function () {
    this.setData({
      editable: !this.data.editable
    })
  },

})