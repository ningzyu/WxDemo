// pages/list/list.js
var app = getApp();
var zhcn = require('../../utils/strings.js');
var english = require('../../utils/stringe.js');
var mhttp = require('../../utils/myhttp.js');
Page({

  data: {
    httptype:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var openid = wx.getStorageSync('openid') ;
    that.setData({
      openid: openid,
    });
    mhttp.fetchPost(mhttp.Meslist, { openid: openid }, (err, res) => {
      if(res){
        that.setData({
          meslist: res,
          httptype:1
        });
      }else{
        httptype: 0
      }
      
    });
    //设置中英文
    if (app.language == "zh_CN") {
      that.setData({
        language: zhcn,
      })
    }else{
      that.setData({
        language: english,
      })
    }
    
  },
  tomesitem: function (e) {
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../mesitem/mesitem?id="+id
    });
  },

  newinfo: function (){
    wx.navigateTo({
      url: "../info/info"
    });
  },
  
})