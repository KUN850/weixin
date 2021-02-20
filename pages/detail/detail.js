// pages/detail/detail.js
let datas=require('../../datas/list-data')
const appDatas=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isMusicPlay:true
  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options); //传送过来的值
      let index=options.index;
      this.setData({
        detailObj:datas.list_data[index],
        index
      });
      let detailStorage=wx.getStorageSync('isCollected');//对象
     console.log(detailStorage);
       
      if(!detailStorage){
        wx.setStorageSync('isCollected', {});
      }
    
      if(detailStorage[index]){//判断有没有收藏
        console.log(index);
        this.setData({
          isCollected:true
        })
      }

      wx.onBackgroundAudioPlay((res) => {
            this.setData({
              isMusicPlay:true
            });

            appDatas.data.isPlay=true;
            appDatas.data.pageIndex=index;
             
      });

      if(appDatas.data.isPlay && appDatas.data.pageIndex===index){
        this.setData({
          isMusicPlay:true
        })
      }

      wx.onBackgroundAudioPause((res) => {
        this.setData({
          isMusicPlay:false
        });

        appDatas.data.isPlay=true;
        appDatas.data.pageIndex=index;
      })
  },

  handleCollection(){
    let isCollected=!this.data.isCollected;
    this.setData({
      isCollected
    });
    let title=isCollected?"收藏成功":"取消收藏";
    wx.showToast({
      title: title,
      icon:'success'
    });
    let {index}=this.data;
   // let obj={};
   wx.getStorage({
     key: 'isCollected',
     success:(datas)=>{
          console.log(datas,typeof data);
          let obj=datas.data;
          obj[index]=isCollected;
          wx.setStorage({
            data: obj,
            key: 'isCollected',
            success:()=>{
              console.log("缓存成功");
            }
          });
         
     }
   })
   
     
},

 handleMusicPlay(){
   let isMusicPlay=!this.data.isMusicPlay;
   this.setData({
     isMusicPlay
   });
   if(isMusicPlay){
     const {dataUrl,title}=this.data.detailObj.music;
     console.log(dataUrl);
     console.log(title);
     wx.playBackgroundAudio({
      dataUrl,
       title
     })
   }
    

 },

 handleShow(){
   wx.showActionSheet({
     itemList: ['分享到朋友圈','分享到qq空间','分享到微博'],
   })
 },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})