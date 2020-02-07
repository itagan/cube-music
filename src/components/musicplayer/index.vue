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
            <li @click.stop="toMoreOpera">
              <i class="iconfont icongengduo"></i>
            </li>
          </ul>
        </div>
        
        <div class="middle-container-lyric" v-show="!ismusic" @click="toMusic">
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
                <li class="li" v-for="(line,index) in currentLyric.lines" :key="index" :class="{'current': currentLineNum === index}">
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
          <div class="progress-wrapper">
            <span class="time time-l">{{dtTran(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar 
              ref="progressBar" 
              :percent="percent" 
              @percentChange="onProgressBarChange"
              @percentChanging="onProgressBarChanging"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.dt)}}</span> 
          </div>

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
    <audio ref="audio"  @playing="ready" @error="error" @timeupdate="updateTime"
           @ended="end" @pause="paused"></audio>
    <play-list ref="showPlayList" :playlist="playlist"></play-list>
    <play-more
      v-if="isMore"
      @ring="setRing"
      @collect="toCollected"
      @singer="toSinger"
      @album="toAlbum"
      @cancel="cancelMore"
      :track="currentSong"
      :single="true"
      ref="playMore"
    ></play-more>
    <share-dialog ref="shareShow" @cancel="cancelShare"></share-dialog>
    <set-ring ref="setRingShow"></set-ring>
    <collection-to-list ref="collectedShow" @bulid="bulidlist" :checkLists="checkLists"> </collection-to-list>
    <build-list  @cancel="cancel" :track="currentSong" ref="showBuild"></build-list>
  </div>
</template>

<script>
import myHeader from './header'
import playList from './playlist'
import progressBar from '../../base/progress/progress-bar'
import playMore from '../common/playmore'
import shareDialog from '../common/sharedialog'
import setRing from '../common/setring'
import buildList from '../common/buildlist'
import collectionToList from '../common/collectiontolist'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Lyric from 'lyric-parser'
import {durationsTransformation, dtTrans} from '../../assets/js/timestamp'

export default {
  components: {
    myHeader,
    playList,
    progressBar,
    playMore,
    shareDialog,
    setRing,
    collectionToList,
    buildList
  },
  props: {},
  data() {
    return {
      profile: {},
      item:{},
      currentPage:0,
      ismusic:true,
      currentLyric: null,
      url:'',
      state:true,
      songReady: false,
      canLyricPlay:false,
      currentLineNum: 0,
      currentTime:0,
      checkLists:[],
      isMore: false,
      firstLyric:true,
      options: {
        scrollbar: true
      },
      scrollY: 0,
      scrollEvents: ['scroll']
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id  || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      this.canLyricPlay = false
      this.getLyric()
      this.getUrl(newSong.id)
      this.firstLyric = true
    },
    url(newUrl, oldUrl) {
      if(!newUrl) {
        this.setPlayingState(false)
        }else {
          //解决初次地址为空无法播放问题。因获取地址是异步请求，所以监控地址变化获取当前该播放的，而避免是下一首的
        this.$nextTick(() =>{
        this.$refs.audio.src = newUrl
        this.$refs.audio.play()
      })
        }
    },
    playing (newPlaying) {
      if (!this.songReady) {
        return
      }
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
      this.$nextTick(() => {
        newPlaying ? this.currentLyric.play() : this.currentLyric.stop()
      })
      // if (!newPlaying) {
      //   if (this.fullScreen) {
      //     this.syncWrapperTransform('imageWrapper', 'image')
      //   } else {
      //     this.syncWrapperTransform('miniWrapper', 'miniImage')
      //   }
      // }
    },
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
    percent () {
      return this.currentTime / (this.currentSong.dt / 1000)
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
      if (this.currentLyric) {
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        // this.playingLyric = ''
        this.currentLineNum = 0
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
      // this.$nextTick(() => {
      //   this.currentLyric.play()
      // })
    },
    getLyric () {
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentLyric = null
      }

      this.$api.playmusic.lyric(this.currentSong.id).then(res =>{
        if(res.data.code === 200) {
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
          if (this.playing) {
          this.currentLyric.play()
          // // 歌词重载以后 高亮行设置为 0
          // this.currentLineNum = 0
          // this.$nextTick(() => {
          //   this.$refs.Scroll.scroll.scrollTo(0, 0, 1000)
          // })
        }
        }
      })
    },
    getUrl (id) {
      this.$api.playmusic.url(id).then(res =>{
        if(res.data.code === 200) {
          this.url = res.data.data[0].url
        }
        console.log(this.url)
      })
    },
    getCheck () {
      this.$api.playmusic.check(this.currentSong.id).then(res =>{
        if(res.data.code === 200) {
          this.state = res.data.state
        }
      })
    },
    toLyric () {
      this.ismusic = false
      //解决一开始不能滚动问题
      this.$nextTick(() => {
        if(this.currentLyric && this.firstLyric) {
          this.firstLyric = false
          this.$refs.Scroll.refresh()
        }
      })
    },
    toMusic () {
      this.ismusic = true
    },
    controlPlay () {
      this.setPlayingState(!this.playing)

    },
    ready () {
      clearTimeout(this.timer)
      // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
      this.songReady = true
      this.canLyricPlay = true
      // this.savePlayHistory(this.currentSong)
      // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
      // if (this.currentLyric && !this.isPureMusic) {
      //   this.currentLyric.seek(this.currentTime * 1000)
      // }
    },
    paused () {
      this.setPlayingState(false)
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
    },
    error () {
      clearTimeout(this.timer)
      this.songReady = true
    },
    end () {
      this.currentTime = 0
      // if (this.mode === playMode.loop) {
      //   this.loop()
      // } else {
      //   this.next()
      // }
    },
    onProgressBarChange (percent) {
      const currentTime = (this.currentSong.dt / 1000) * percent
      this.currentTime = this.$refs.audio.currentTime = currentTime
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
      if (!this.playing) {
        // this.togglePlaying()
      }
    },
    onProgressBarChanging (percent) {
      this.currentTime = (this.currentSong.dt / 1000) * percent
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    handleLyric ({ lineNum, txt }) {
      console.log({ lineNum, txt })
      if (!this.$refs.lyricLine) {
        return
      }
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.Scroll.scroll.scrollToElement(lineEl, 1000)
      } else {
        this.$nextTick(() => {
          this.$refs.Scroll.scrollTo(0, 0, 1000)
        })
      }
      // this.playingLyric = txt
    },
    format (urations) {
      return durationsTransformation(urations)
    },
    dtTran (interval) {
      return dtTrans(interval)
    },
    //弹窗有关
    toMoreOpera () {
      this.isMore = true
      this.$nextTick(() => {
        this.$refs.playMore.show()
      })
    },
    cancelMore () {
      this.$refs.playMore.hide()

        // this.isMore = false
        // this.$nextTick(() => {
        //     this.$refs.playMore.hide()
        // })
      setTimeout(() => {
        this.isMore = false
      }, 500)
    },
    setRing () {
      this.$refs.setRingShow.show()
    },
    toCollected () {
      this.isMore = false
      this.$refs.collectedShow.show()
      this.checkLists.push(this.currentSong)
    },
    toSinger () {
      if(this.currentSong.ar.length > 1) {
        this.moreSinger()
        this.isMore = false
        return
      }
      this.$api.singers.singermusic(this.currentSong.ar[0].id).then(res => {
        if(res.data.artist.accountId) {
          this.accountId = res.data.artist.accountId
          let userId = this.accountId
          this.closeFull() 
          this.$router.push({
            path: `/singer/${userId}/${this.currentSong.ar[0].id}`
            })
        }else {
          let userId = 477726475
          this.closeFull() 
          this.$router.push({
            path: `/singer/${userId}/${this.currentSong.ar[0].id}`
            })
        }
      })
      this.isMore = false
    },
    toAlbum () {
      this.$router.push({
        path:`/albumlist/${(this.currentSong.album && this.currentSong.album.id) || (this.currentSong.al && this.currentSong.al.id)}`
        })
      this.isMore = false
      this.closeFull() 
    },
    cancelShare () {
      this.$refs.shareShow.hide()
      // setTimeout(() => {
      //   this.isMore = false
      // }, 500)
    },
    toShare () {
      this.$refs.shareShow.show()
    },
    bulidlist () {
      // this.isBuild = true
      // this.isMore = false
      this.$refs.showBuild.show()
      
    },
    cancel () {
      this.isBuild = false
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
        .progress-wrapper
          display: flex
          align-items: center
          width: 95%
          margin: 0px auto
          padding: 10px 0
          .time
            color: white
            opacity:.5
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
              margin-right:10px
            &.time-r
              text-align: right
              margin-left:10px
          .progress-bar-wrapper
            flex: 1
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
              opacity:.5
              font-size: $font-size-medium
            .current  
              color:white
              opacity:1
      
      
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