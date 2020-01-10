<template>
  <div class="wrapper">

    <div class="pullloadtop" v-if="!hotSongs.length">
     <div>
        <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
     </div>
    </div>

     <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        nest-mode="native"
        >
        <ul class="ul-list">
          <li class="ul-list-top">
            <i class="iconfont iconbofang2"></i>
            <span class="play-text"> 播放热门</span>
            <span class="play-num">50</span>
          </li>

          <li v-for="(item, index) in hotSongs.slice(0,5)" :key="item.id">
            <div class="song-base">
              <div class="num">
                <span v-show="!playing">{{index + +1}}</span>
                <i class="iconfont iconlaba" v-show="playing"></i>
              </div>

              <div class="song-base-content">
                <div class="title" :class="[playing ? 'activeColor' : '']">
                  <span class="title-left">{{item.name}}</span>
                  <span class="title-right" v-if="item.alia && item.alia.length">({{item.alia[0]}})</span>
                </div>
                <div class="desc">
                  <img src="" alt="" class="sq">
                  <!-- <span class="nickname">{{item.ar[0].name}}</span> -->
                  <span class="name">{{item.al.name}}</span>
                </div>
              </div>

              <div class="playing">
                <i class="iconfont iconbofang5"></i>
              </div>
              <div class="more" @click="more(index)">
                <i class="iconfont icongengduo"></i>
              </div>
            </div>
          </li>

          <li class="ul-list-bottom">
            <span>更多热歌</span>
            <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="ul-message">
          <li class="ul-message-top">基本信息</li>
          <li class="ul-message-center">昵称:
            <span>{{artist.name}}</span>
          </li>
          <li class="ul-message-center">
            性别:
            <span v-if="profile.gender === 0"></span>
            <span v-if="profile.gender === 1">男</span>
            <span v-if="profile.gender === 2">女</span>
          </li>
          <li class="ul-message-center-more">
            简介:
            <span>
              {{artist.briefDesc}}
            </span>
          </li>
          <li class="ul-message-bottom">
            <span>更多信息</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="home-page-music">
          <li class="home-page-music-top">TA在网易云音乐</li>
          <li>
            <song-list-base>
            <div slot="left" class="home-page-music-rank">
              <i class="iconfont iconpaixingbang"></i>
            </div>
            <span slot="top">听歌排行</span>
            <span slot="bottom">累积听歌{{userMessage.listenSongs}}首</span>
          </song-list-base>
          </li>
          <li>
            <song-list-base class="home-page-music-like">
              <div slot="left" class="home-page-music-like-heart" @click="toListLike">
                <i class="iconfont iconxin"></i>
              </div>
            <span slot="top" v-if="profile" @click="toListLike">{{profile.nickname}} 喜欢的音乐</span>
            <span slot="bottom" @click="toListLike">{{trackCountLike}}首，播放{{playCountLike}}次</span>
          </song-list-base>
          </li>
           <li>
            <song-list-base>
            <div slot="left" class="home-page-music-songlist">
              <i class="iconfont iconpaixingbang"></i>
            </div>
            <span slot="top">歌单</span>
            <span slot="bottom">麦克</span>
          </song-list-base>
          </li>
        </ul>

    </cube-scroll>
    </div>
  </div>
</template>

<script>
import songListBase from '../../base/song/songlistbase'
export default {
  components: {
    songListBase
  },
  props: {
    id:{
      type:String,
      default:''
    },
    begin:{
      type:Boolean,
      default:false
    },
    profile: {
      type: Object,
      default: {}
    },
    userMessage: {
      type: Object,
      default: {}
    },
    userId:{
      type:String,
      default:''
    },
  },
  data() {
    return {
      hotSongs:[],
      artist:{},
      playing:false,
      options: {
        pullUpLoad: false,
        scrollbar: false,
        click: false, // 解决点击事件被触发两次的问题
        stopPropagation:false,
        scrollX:false,
        scrollY:true
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      scrollY: 0,
      trackCountLike:0,
      playCountLike:0
    }
  },
  watch: {
    begin(val) {
      // if(val)
      // this.options.scrollY = val
      this.$refs.contentScroll.enable()
      //  this.$refs.contentScroll.forceUpdate()
       this.$nextTick(() =>{
        //  this.$refs.contentScroll.forceUpdate()
        this.$refs.contentScroll.refresh()
       })
    }
  },
  computed: {},
  methods: {
    getMusic () {
      this.$api.singers.singermusic(this.id).then(res => {
        // this.userId = res.data.artist.accountId
        this.hotSongs = res.data.hotSongs
        this.artist = res.data.artist
        // setTimeout(() => {
        //    this.hotSongs = res.data.hotSongs
        //   this.artist = res.data.artist
        // }, 300000);
      })
    },
    getPlaylist () {
        this.$api.users.playlist(this.userId).then(res => {
          // this.playlist = res.data.playlist.filter((item) => {
          //   return item.creator.userId === this.userId
          // })
          // this.trackCountLike = this.playlist[0].trackCount
          // this.playCountLike = this.playlist[0].playCount

          this.playlist = res.data.playlist
          this.trackCountLike = this.playlist[0].trackCount
          this.playCountLike = this.playlist[0].playCount

          console.log(this.playlist)

        })
      },
    onPullingUp () {
      // if(!this.hasMore) return
      // setTimeout(() => {
      //   this.getFollows(477726475, this.offset)
      //   const contentScroll = this.$refs.contentScroll
      //   contentScroll.forceUpdate()
      // }, 1000)
      console.log('上拉左边')
    },
    scrollHandler (pos) {
      this.scrollY = -pos.y
      //  console.log('子组件左边滚动' + this.scrollY)
    },
    Disable () {
      // this.$refs.contentScroll.disable()
      // console.log(this.$refs.contentScroll)
    },
    Enable () {
      // this.$refs.contentScroll.enable()
      // this.options.scrollY = true
       this.$refs.contentScroll.refresh()
      //  console.log('开始滚动')
    },
    toListLike() {

    }
  },
  created() {
    this.getMusic()
    this.getPlaylist()
    
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.Disable()
    // })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  
  .ul-list
    height:auto
    width:375px
    background-color:white
    border-bottom:8px solid rgba(128,128,128,.1)
    .ul-list-top
      display:flex
      font-size:$font-size-medium-x
      font-weight:bold
      height:40px
      line-height:40px
      padding-left:15px
      .play-text
        margin-left:10px
      .play-num
        margin-left:5px
    .ul-list-bottom  
      display:flex
      font-size:$font-size-medium
      height:40px
      line-height:40px
      justify-content:center
      color:gray
    li
      .song-base
        display:flex
        width:375px
        height:50px
        position:relative
        .num
          width: 40px
          height:50px
          flex-center()
          color:gray
        .song-base-content
          height:50px
          position:absolute
          left:40px
          max-width:250px
          .title
            font-size:$font-size-medium-x
            ellipsis()
            max-width:250px
            height:28px
            line-height:28px
            margin-left:3px
            .title-right
              color:gray
          .desc
            font-size:$font-size-small
            color:gray
            ellipsis()
            max-width:250px
        /*height:22px*/
        /*line-height:22px*/
        .playing
          width: 40px
          height:50px
          flex-center()
          position:absolute
          right:30px
          color:gray
        .more
          width: 40px
          height:50px
          flex-center()
          position:absolute
          right:0
          color:gray
  
  .ul-message
    height:auto
    width:100%
    border-bottom:8px solid rgba(128,128,128,.1)
    .ul-message-top
      font-size:$font-size-medium-x
      height:35px
      line-height:35px
      color:black
      margin-top:10px
    li
      color:gray
      font-size:$font-size-small
      margin:auto 15px
    .ul-message-center
      height: 20px
      line-height:20px 
    .ul-message-center-more
      height:auto
      multiline-ellipsis(4)
      margin-top:5px
      line-height:1.5
    .ul-message-bottom
      display:flex
      font-size:$font-size-medium
      height:40px
      line-height:40px
      justify-content:center
      color:gray   

  .home-page-music
    height:auto
    padding-bottom:50px
    .home-page-music-top
      font-size:$font-size-medium-x
      height:35px
      line-height:35px
      color:black
      margin:10px 15px auto
    li
      margin:auto 5px  
    .home-page-music-like
      margin:10px auto
    .home-page-music-rank
      background-color:indianred
      flex-center()
      border-radius:5px
      i
        font-size:$font-size-large-x
        color:white
    .home-page-music-songlist
      background-color:gray
      flex-center()
      border-radius:5px 
    .home-page-music-like-heart
      background-color:silver
      flex-center()
      border-radius:5px
      i
        font-size:$font-size-large-x
        color:red    



  .content-scroll-wrapper
    position:relative
    height:567px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:0
    background-color:white 
    .content
      height: 100%
      overflow: hidden     



    //上方加载中相关样式
  .pullloadtop
    width:100%
    height:100%
    position: absolute
    top:0
    left:0
    bottom:0
    z-index: 10000
    // flex-center()
    background-color:white
    display:flex
    div
      position:absolute
      top:100px
      left:150px
      .load
        font-size:$font-size-medium-x 
        i
          color:red
        span
          color:gray      

  
</style>