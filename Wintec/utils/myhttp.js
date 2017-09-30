// var IP = 'http://192.168.12.67:8888';
var IP = 'http://www.xixihaha.xin';
var MURL =IP+'/WinTec';
var PosServlet = MURL+'/PosServlet';
var SkillWord = IP +'/WintecWebService/WebService?methodCode=12';
// var SkillWord = MURL + '/WinTecWeb?paratype=Skill';
//http://www.xixihaha.xin/WinTec/PosServlet?typeid=

//http://www.xixihaha.xin/WinTec/SkillWord
//http://192.168.12.67:8888/WinTec/WinTecWeb?paratype=Message&openid=ogucB0bNuyW99qJCq5DLpC0UQS4A
//http://www.xixihaha.xin/WinTec/WinTecWeb?paratype=Message&openid=ogucB0bNuyW99qJCq5DLpC0UQS4A
var MURL2 = 'http://192.168.12.67:8888/WinTec';
var Meslist = MURL +'/WinTecWeb?paratype=Messages';
var getopenid = MURL + '/WinTecWeb?paratype=getopenid'; 
var wxzxing = 'https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN';
// get请求方法
function fetchGet(url, callback) {
  // return callback(null, top250)
  wx.request({
    url: url,
    method: 'GET',
    header: { 'Accept': 'application/json' },
    success(res) {
      callback(null, res.data)
    },
    fail(e) {
      console.error(e)
      callback(e)
    }
  })
}

// post请求方法
function fetchPost(url, data, callback) {
  wx.request({
    method: 'POST',
    url: url,
    header: {"content-type": "application/x-www-form-urlencoded;charset=utf-8"},
    data: data,
    success(res) {
      callback(null, res.data)
    },
    fail(e) {
      console.error(e)
      callback(e)
    }
  })
}
//下载文件
function fetchDownload(url, callback) {
  wx.downloadFile({
    url: url,
    // type:'mp4',
    success: function (res) {
      var tempFilePaths = res.tempFilePath;
      callback(null, tempFilePaths)
      // wx.saveFile({
      //   tempFilePath: tempFilePaths,
      //   success: function (res) {
      //     var savedFilePath = res.savedFilePath
      //     callback(null, savedFilePath)
      //   }
      // })
      // wx.getSavedFileList({
      //   success: function (res) {
      //     console.log(res.fileList)
      //   }
      // })
    },
    fail(e) {
      console.error(e)
      callback(e)
    },
  })
}


module.exports = {
  // API
  IP: IP,
  MURL: MURL,
  PosServlet: PosServlet,
  SkillWord: SkillWord,
  MURL2: MURL2,
  Meslist: Meslist,
  getopenid: getopenid,
  wxzxing: wxzxing,
  // METHOD
  fetchGet: fetchGet,
  fetchPost: fetchPost,
fetchDownload: fetchDownload


}