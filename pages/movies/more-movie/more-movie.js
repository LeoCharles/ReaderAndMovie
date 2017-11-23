// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');

Page({

  data: {
    movies: {},
    navigateTitle: ''
  },

  // 页面初始化
  onLoad: function (options) {
    // 获取跳转地址传过来的参数并保存
    var category = options.category;
    this.setData({
      navigateTitle: category
    })

    var dataUrl = '';
    switch (category) {
      case '正在热映': 
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case 'TOP250':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    };
    util.http(dataUrl, this.processDoubanData)

  },

  // 处理豆瓣数据
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var temp = {
        title: subject.title,
        coverageUrl: subject.images.large,
        average: subject.rating.average,
        stars: util.coverToStarsArray(subject.rating.stars),
        movieId: subject.id
      };
      movies.push(temp);
    }
    this.setData({
      movies: movies
    });
  },

  // 页面加载完成
  onReady: function (event) {
    // 动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  // 上拉加载
  onScollLower: function (event) {
    console.log('加载更多')
  },
 

})