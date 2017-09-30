var that;
let app = getApp();
var address = require('../../utils/city.js');
// var mhttp = require('../../utils/myhttp.js');
var animation;
Page({
  data: {
    userInfo: {},//用户信息
    images: [],//图片数组
    imageWidth: app.screenWidth / 4 - 10,//图片大小
    hiddenToast: true,//吐司
    model: "",//机型
    phone: "",//手机
    /**
      * 页面的初始数据
      * 当前    provinces:所有省份
      * citys选择省对应的所有市,
      * areas选择市对应的所有区
      * provinces：当前被选中的省
      * city当前被选中的市
      * areas当前被选中的区
      */
    // menuType: 0,
    // begin: null,
    // status: 1,
    // end: null,
    areaInfo:"",
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],//组合
    provinces: [],//所有省份
    citys: [],//选择省对应的所有市,
    areas: [],//选择市对应的所有区
    province: '',//当前被选中的省
    city: '',//当前被选中的市
    area: '',//当前被选中的区
  },
  //初始化数据
  onLoad: function (options) {
    //获取当前微信账户信息
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    });
    that = this;

    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
    console.log(this.data)
  },
  // 选择图片
  chooseImage: function () {
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
      }
    })
  },
  previewImage: function () {
    // 预览图集
    wx.previewImage({
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

  //提交按钮
  submitimg: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.info(res.tempFilePaths.length);
        that.uploadFile2(tempFilePaths, 0);
      }
    })
  },
  uploadFile2: function (file, i) {//递归调用
    console.log("file路径为" + file);
    var that = this;
    wx.uploadFile({
      // url: 'http://192.168.12.56:8080/WintecWebService/WebService?methodCode=2&userid=001&comname=wintec&username=nzy&sendtime=2017-01-01 12:12:12&remark=hhhhh&tel=nnnn&postype=anypos100&imgcount=3&address=ssss', //仅为示例，非真实的接口地址
      // url: 'http://192.168.12.56:8080/WintecWebService/WebService',
      url: 'http://192.168.12.67:8888/WinTec/TestServlet',
      // url: 'http://192.168.12.56:8080/test2/upload',
      filePath: file[i],

      name: 'wxfile',
      header: { "Content-Type": "multipart/form-data" },
      // header: { "Content-Type": "application/octet-stream" },

      formData: {
        'name': '宁震宇',
        'gender': 'boy',
        'age': '25',
        'phone': '18636025323'
      },

      success: function (res) {
        var obj = new Object();
        obj.ind = i + 1;
        var data = res.data;
        console.info("res.data数据为" + res.data.pathStr);
        console.info("data数据为" + data);
        obj.src = data;
        res.statusCode
        console.info(" res.statusCode --" + res.statusCode);
        console.info("obj.src--" + obj.src);
        console.info("---------------------------------");
        console.info(obj);
        if (!((i + 1) == file.length)) {
          total.push(obj);
          that.uploadFile2(file, i + 1);
        } else {
          total.push(obj);
          that.setData({ perImgSrc: total });
        }
      }
    })
  },
  //提交按钮
  submit: function () {
    // this.setData({
    //   toastText: that.data.images[1],
    //   hiddenToast: !this.data.hiddenToast,
    // });



    //success回调this作用域更新不了外面的数据,所以保存当前this
    var that = this;
    // 这里进行非空验证
    wx.request({
      url: "http://192.168.12.67:8888/WinTec/PosServlet?typeid=all",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { name: "宁震宇", password: "123456" },
      // data: Util.json2Form({ cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" }),
      success: function (res) {
        console.log(res.data);
        console.log("请求成功");
        that.setData({
          toastText: res.data[1].typeid,
          hiddenToast: !that.data.hiddenToast,
        });
        if (res == null || res.data == null) {
          that.setData({
            toastText: res.data,
            hiddenToast: !that.data.hiddenToast,
          });
          console.error('网络请求失败');
          return;
        }
      },
      fail: function (err) {
        console.log(err);
        console.log("请求失败");
      },
    })

  },
  // toast显示时间到时处理业务
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 显示
  // showMenuTap: function (e) {
  //   console.log('selectState')
  //   //获取点击菜单的类型 1点击状态 2点击时间 
  //   var menuType = e.currentTarget.dataset.type
  //   // 如果当前已经显示，再次点击时隐藏
  //   if (this.data.isVisible == true) {
  //     this.startAnimation(false, -200)
  //     return
  //   }
  //   this.setData({
  //     menuType: menuType
  //   })
  //   this.startAnimation(true, 0)
  // },
  // hideMenuTap: function (e) {
  //   this.startAnimation(false, -200)
  // },
  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
    console.log(that.data)
  },
  // // 选择状态按钮
  // selectState: function (e) {
  //   console.log('selectState1')
  //   this.startAnimation(false, -200)
  //   var status = e.currentTarget.dataset.status
  //   this.setData({
  //     status: status
  //   })
  //   console.log(this.data)

  // },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
    console.log(this.data)
  },

  getvideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 10,
      camera: 'back',
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
})