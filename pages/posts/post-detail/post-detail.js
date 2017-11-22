  // pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({

  data: {
    currentPostId: null,
    isPlayingMusic: false
  },
  
  onLoad: function (options) {

    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData,
      currentPostId: postId
    })

    // 获取缓存值
    var postsCollected = wx.getStorageSync('posts_collected');
    // 判断缓存是否存在
    if (postsCollected) {
      var isCollected = postsCollected[postId];
      // 绑定数据，确定显示的图片
      this.setData({
        isCollected: isCollected
      })
    } else {
      // 添加缓存值
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);  
    }

    // 判断全局音乐播放状态
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId) {
      this.setData({
        isPlayingMusic: true
      })
    }

    // 监听音乐播放
    this.setMusicMonitor();

  },

  // 监听音乐播放函数
  setMusicMonitor: function () {
    var _this = this;
    // 监听音乐播放
    wx.onBackgroundAudioPlay(function(e) {
      if (app.globalData.g_currentMusicPostId === _this.data.currentPostId) {
        _this.setData({
          isPlayingMusic: true
        })
      }
      // 修改全局音乐播放状态
      app.globalData.g_isPlayingMusic = true;
    }),
    // 监听音乐暂停
    wx.onBackgroundAudioPause(function(e) {
      if (app.globalData.g_currentMusicPostId == _this.data.currentPostId) {
        _this.setData({
          isPlayingMusic: false
        })
      }
      // 修改全局音乐播放状态
      app.globalData.g_isPlayingMusic = false;
    }),
    // 监听音乐停止
    wx.onBackgroundAudioStop(function () {
      _this.setData({
        isPlayingMusic: false
      })
      // 修改全局音乐播放状态
      app.globalData.g_isPlayingMusic = false;
    })
  },
 

  // 收藏
  onCollectionTap: function (e) {
    // 获取缓存值
    var postsCollected = wx.getStorageSync('posts_collected');
    var isCollected = postsCollected[this.data.currentPostId];
    // 点击切换是否收藏
    isCollected = !isCollected;
    // 保存当前文章是否收藏
    postsCollected[this.data.currentPostId] = isCollected;
    // 更新当前文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据切换图片
    this.setData({
      isCollected: isCollected
    })
    // 交互反馈
    wx.showToast({
      title: isCollected ? '收藏成功' : '取消收藏',
      duration: 1000
    })
  },

  // 分享
  onShareTap: function (e) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享给QQ好友",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '微信小程序目前还不支持分享功能。',
        })
      }

    })
  },

  // 音乐播放
  onMusicTap: function(e) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      });
      app.globalData.g_isPlayingMusic = false;
    } else {
      wx.playBackgroundAudio({
        title: postData.music.title,
        dataUrl: postData.music.url,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      });
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }
  },

  
})