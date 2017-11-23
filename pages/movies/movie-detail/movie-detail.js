// pages/movies/movies-detail/movies-detail.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  data: {
  
  },

  // 监听页面加载
  onLoad: function (options) {
    var movieId = options.id;
    var detailUrl = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    util.http(detailUrl, this.processDoubanData);
  },

  // 处理豆瓣电影数据
  processDoubanData: function (movieData) {
    console.log(movieData)
  },

})