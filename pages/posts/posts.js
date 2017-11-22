// pages/posts/posts.js
var postData = require('../../data/posts-data.js');

Page({

  data: {

  },

  onLoad: function (options) {
    // 从服务器获取数据后给data赋值
    console.log(options)
    this.setData({
      postList: postData.postList
    });
  },
  
  onPostTap: function (event) {
    // currentTarget是绑定事件的组件，也就是事件捕获的组件。
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
    
  },

  // 点击轮播图片，冒泡到容器
  onSwiperTap: function (event) {
    // target指的是当前点击的组件，也就是触发事件的源组件。
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },



})