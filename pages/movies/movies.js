// pages/movies/movies.js
var app = getApp();

Page({

  data: {
  
  },

  onLoad: function (options) {
    // 请求豆瓣数据 注意：'content-type'不要设置为application/json或空
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    
    this.getMovieListData(inTheatersUrl);
    this.getMovieListData(comingSoonUrl);
    this.getMovieListData(top250Url);

  },

  // 获取豆瓣电影数据
  getMovieListData: function (url) {
    var _this = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        _this.processDoubanData(res.data)
      },
      fail: function (err) {
        console.log('fail')
      }
    })
  },

  // 处理豆瓣数据
  processDoubanData: function(moviesDouban) {
    var movies = [];
    for(var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
    }
  },


})