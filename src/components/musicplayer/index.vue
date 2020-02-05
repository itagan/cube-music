<template>
  <div class="wrapper" v-show="playlist.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <my-header :profile="currentSong"  class="my-header" ref="myHeader" @close="closeFull"></my-header>
        <div class="user-background" ref="bgEnlarge">
          <img width="100%" height="100%" v-lazy="currentSong.al.picUrl" alt="" ref="Enlarge" v-if="currentSong.al">
        </div>
        <div class="middle-container" v-show="ismusic" @click="toLyric">
           <!-- 中间部分：唱片 -->
          <div class="middle">
            <div class="middle-l">
              <div class="cd-wrapper" ref="cdWrapper">
                <div class="cd">
                  <!-- <img class="image" :src="currentSong.al.picUrl"> -->

                </div>
              </div>
            </div>
          </div>
          <!-- 唱片轮播 -->
          <div  class="middle-slide"  v-if="playlist && playlist.length">
            <cube-slide
          :initialIndex="currentIndex"
          :loop="false"
          :autoPlay="false"
          :threshold="0.1"
          :showDots = 'false'
          @change="slideChange">
          
          <cube-slide-item :index="index" class="middle-slide-item" v-for="(item, index) in playlist" :key="index">
            <!-- <div class="middle-slide-wrap" :class="RotateClass" ref="rotateRef"> -->
            <div class="middle-slide-wrap" :class="playing && currentIndex===index ? 'play' : 'pause'" ref="rotateRef">
              <div class="middle-slide-wrap-content">
                <img  v-lazy="item.al.picUrl" alt="" class="middle-slide-wrap-img" v-if="item.al && item.al.picUrl">
              </div>
            </div>
          </cube-slide-item>
          </cube-slide>
          </div>

          <ul class="player-bottom-opera player-bottom-icon">
            <li>
              <i class="iconfont iconxin"></i>
            </li>
            <li>
              <i class="iconfont iconxiazaigequ"></i>
            </li>
            <li>
              <i class="iconfont iconcailingdingzhi"></i>
            </li>
            <li>
              <i class="iconfont iconpinglun"></i>
            </li>
            <li>
              <i class="iconfont icongengduo"></i>
            </li>
          </ul>
        </div>
        <div class="middle-container-lyric" v-if="!ismusic" @click="toMusic">
          <ul class="middle-container-lyric-volume">
            <li>
              <i class="iconfont iconlaba"></i>
            </li>
            <li class="middle-container-lyric-control">
              <div class="volume-control"></div>
            </li>
            <li>
               <i class="iconfont iconlive"></i>
            </li>
          </ul>

          <div class="scroll-list-wrap" v-if="currentLyric && currentLyric.lines">
            <cube-scroll
              ref="Scroll"
              :options="options"
              :scroll-events="scrollEvents"
              @scroll="scrollHandler"
              :data="currentLyric && currentLyric.lines"
              >
              <ul class="lyric-content">
                <li class="li" v-for="(line,index) in currentLyric.lines" :key="index">
                  <!-- <div class="lyric-wrapper">
                    <div v-if="currentLyric"> -->
                      <p ref="lyricLine"
                      >{{line.txt}}</p>
                    <!-- </div>
                    <div class="pure-music" v-show="isPureMusic">
                      <p>{{pureMusicLyric}}</p>
                    </div>
                  </div> -->
                </li>
              </ul>
            </cube-scroll>
          </div>
        </div>
        <div class="player-bottom">
          <div></div>
          <ul class="player-bottom-icon">
            <li @click.stop="taggleMode"> 
              <i class="iconfont icongengxin"></i>
            </li>
            <li @click.stop="prev">
              <i class="iconfont iconkuaitui2"></i>
            </li>
            <li @click.stop="controlPlay"> 
              <i class="iconfont" style="font-size:60px" :class="playIcon"></i>              
            </li>
            <li @click.stop="next">
              <i class="iconfont iconkuaijin"></i>
            </li>
            <li @click.stop="openPlaylist">
              <i class="iconfont iconorder"></i>
            </li>
          </ul>
        </div>
     </div>
    </transition>

    <play-list ref="showPlayList" :playlist="playlist"></play-list>
  </div>
</template>

<script>
import myHeader from './header'
import playList from './playlist'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Lyric from 'lyric-parser'

export default {
  components: {
    myHeader,
    playList
  },
  props: {},
  data() {
    return {
      profile: {},
      item:{},
      currentPage:0,
      // fullScreen:true,
      ismusic:true,
      // RotateClass:'play'
      currentLyric: null,
      options: {
        scrollbar: true
      },
      scrollY: 0,
      scrollEvents: ['scroll']
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      this.getLyric()
      // this.$nextTick(()=> {
      //   this.$refs.Scroll.refresh()
      //   this.$refs.Scroll.scrollTo(0,0,300)
      // })
    }
  },
  computed: {
    ...mapGetters([
    'currentIndex',
    'fullScreen',
    'playing',
    'playlist',
    'currentSong'
    ]),
    // RotateClass () {
    //   return this.playing ? 'play' : 'pause'
    // },
    playIcon () {
      return this.playing ? 'iconzanting2' : 'iconbofang'
    },
  },
  methods: {
    getMusic () {

    },
    openPlaylist () {
      this.$refs.showPlayList.show()
    },
    closeFull () {
      this.setFullScreen(false)
    },
    toggles (index) {
      this.currentPage = index
    },
    slideChange (index) {
      // this.currentPage = index
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },
    getLyric () {
      this.$api.playmusic.lyric(this.currentSong.id).then(res =>{
        if(res.data.code === 200) {
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
          console.log(this.currentLyric)
        }
        
      })
    },
    toLyric () {
      this.ismusic = false
    },
    toMusic () {
      this.ismusic = true
    },
    controlPlay () {
      this.setPlayingState(!this.playing)
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
      // this.$refs.increaseHeight.style.height = `${this.scrollY}`
    },
    handleLyric ({ lineNum, txt }) {
      // if (!this.$refs.lyricLine) {
      //   return
      // }
      // this.currentLineNum = lineNum
      // if (lineNum > 5) {
      //   let lineEl = this.$refs.lyricLine[lineNum - 5]
      //   this.$refs.lyricList.scrollToElement(lineEl, 1000)
      // } else {
      //   this.$refs.lyricList.scrollTo(0, 0, 1000)
      // }
      // this.playingLyric = txt
    },
    taggleMode () {},
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex:'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE',

    }),
  },
  created() {},
  mounted() {
    this.getMusic ()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:auto
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 2001
      background: gray
      .user-background
        position: absolute
        width: 100%
        height:100%
        top:0
        left:0
        opacity: 0.7
        filter: blur(18px)
        img
          width: 100%
          height: 100%
      .middle-container 
        width:100%
        height:507px
        margin-top:50px  
        position:relative 
        .middle
          position: fixed
          width: 100%
          top: 120px
          bottom: 150px
          white-space: nowrap
          font-size: 0
          .middle-l
            display: inline-block
            vertical-align: top
            position: relative
            width: 100%
            height: 0
            padding-top: 80%
            .cd-wrapper
              position: absolute
              left: 10%
              top: 0
              width: 80%
              box-sizing: border-box
              height: 100%
              margin-left:-20px
              .cd
                width: 300px
                height: 300px
                border-radius: 50%
                border: 20px solid rgba(255, 255, 255, 0.1)
 
        .player-bottom-opera
          position: absolute
          bottom:0px
        .middle-slide
          position: fixed
          width: 100%
          top: 120px
          bottom: 150px
          .middle-slide-item
            width:100%
            margin-top:20px
            .middle-slide-wrap
              width: 200px
              height: 200px
              border-radius: 50%
              border: 50px solid rgba(0, 0, 0,.8)
              margin-left:38px
              .middle-slide-wrap-img
                width: 100%
                height: 100%
                border-radius: 50%
            .play
              animation: rotate 20s linear infinite
            .pause
              animation: rotate 20s linear infinite
              animation-play-state: paused
     
     
      
      .player-bottom  
        position: absolute 
        bottom:0
      .middle-container-lyric
        width:100%
        height:507px
        margin-top:50px  
        position:relative 
        .middle-container-lyric-volume
          flex-between()
          margin:auto 10px
          .middle-container-lyric-control
            width:300px
            height:2px
            background-color:rgba(128,128,128,.6)
            .volume-control
              width:5px
              height:5px
              border-radius:50%
               background-color:white
               position:absolute
        .scroll-list-wrap
          height:450px 
          overflow: hidden 
          .lyric-content
            height:auto
            width:100%
            .li
              height:32px
              line-height: 32px
              text-align:center
              width:100%
              color: white
              opacity:.8
              font-size: $font-size-medium
      
      
      .player-bottom-icon
        flex-between()
        height:80px
        width:375px
        li
          width:20%
          flex-center()
          i 
            font-size:$font-size-large-x
            color:white  


    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)        
</style>