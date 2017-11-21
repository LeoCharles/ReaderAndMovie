// pages/posts/posts.js
var postData = require('../../data/posts-data.js');

Page({

  data: {
    
  },

  onLoad: function (options) {
    // 从服务器获取数据后给data赋值
    this.setData({
      postList: postData.postList
    });
  },
  
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }



})