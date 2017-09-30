// positems.js
var mhttp = require('../../utils/myhttp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    mhttp.fetchPost(mhttp.PosServlet, { typeid: options.id} ,(err, res)=>{
        wx.setNavigationBarTitle({
          title: res.title,
        })
          that.setData({
            posList: res.items
          });
      })
      // setTimeout(function () {
      //   that.setData({ hidden: true });
      // }, 300);
    // })
  },
  onptypeitem: function (event) {
    wx.navigateTo({
      url: "../item/item?id="+ event.currentTarget.dataset.id
    });
  },
})