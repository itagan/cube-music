<template>
  <div class="wrapper">
    <div class="dynamic-top">
      <div class="dynamic-top-img">
        <img :src="events[index].user.avatarUrl" alt="">
      </div>
      <div class="dynamic-right-top">
        <div class="dynamic-right-title">
          <span class="dynamic-right-name">{{events[index].user.nickname}}</span>
          <span>{{Test(events[index].type)}}</span>
        </div>
        <div class="dynamic-right-time">昨天19：20</div>
      </div>
    </div>
    <div class="dynamic-bottom">
      <div class="dynamic-content">
        {{item.msg}}
      </div>
      <!-- 分享歌曲 -->
      <div class="dynamic-center-content" v-if="item.song">
        <share-base class="dynamic-center-content-share">
          <div slot="left" class="share-base-left">
            <img :src="item.song.album.picUrl" alt="">
            <div>
              <i class="iconfont iconbofang3"></i>
            </div>
          </div>
          <span slot="top" >{{item.song.name}}  {{TransName(item.song.transNames)}}</span>
          <span slot="bottom">{{Artist(item.song.artists)}}</span>
        </share-base>
      </div>
      <!-- 分享歌单 -->
      <div class="dynamic-center-content" v-if="item.playlist">
        <share-base class="dynamic-center-content-share">
          <div slot="left" class="share-base-left">
            <img :src="item.playlist.coverImgUrl" alt="">
          </div>
          <div slot="top" class="share-base-songlist">
            <div class="share-base-list">歌单</div>
            <div class="share-base-list-name">{{item.playlist.name}}</div>
          </div>
          <span slot="bottom">by {{item.playlist.creator.nickname}}</span>
        </share-base>
      </div>   
       <!-- 分享专辑 -->
      <div class="dynamic-center-content" v-if="item.album">
        <share-base class="dynamic-center-content-share">
          <div slot="left" class="share-base-left">
            <img :src="item.album.picUrl" alt="">
            <div>
              <i class="iconfont iconbofang3"></i>
            </div>
          </div>
          <span slot="top" >{{item.album.name}}  {{TransName(item.album.transNames)}}</span>
          <span slot="bottom">{{Artist(item.album.artists)}}</span>
        </share-base>
      </div>
      <!-- 分享视频 -->
      <div class="dynamic-center-content" v-if="item.video">
        <share-video class="dynamic-center-content-video">
          <img :src="item.video.coverUrl" alt="" slot="wrapBottom">
          <span slot="wrapLeft">{{serializeNum(item.video.playTime)}}</span>
          <span slot="wrapRight">{{durationsTrans(item.video.durationms)}}</span>
        </share-video> 
      </div>
      <!-- 转发动态 -->
    <div class="dynamic-center-content-event" v-if="item.event">
      <div class="dynamic-content-event">
        <span>{{'@'+ item.event.user.nickname}}</span>
        <span>{{Test(item.event.type)}}</span>
        <span>{{EvalJson(item.event.json).msg}}</span>
      </div>
      <!-- 转发视频 -->
      <div class="dynamic-center-content-event-content" v-if="EvalJson(item.event.json).video">
        <share-video class="dynamic-center-content-event-video">
          <img :src="EvalJson(item.event.json).video.coverUrl" alt="" slot="wrapBottom">
          <span slot="wrapLeft">
            {{serializeNum(EvalJson(item.event.json).video.playTime)}}
          </span>
          <span slot="wrapRight">{{durationsTrans(EvalJson(item.event.json).video.durationms)}}</span>
        </share-video> 
      </div>
      <!-- 转发歌曲 -->
      <div class="dynamic-center-content-event-content" v-if="EvalJson(item.event.json).song">
        <share-base class="dynamic-center-content-share-forward">
          <div slot="left" class="share-base-left">
            <img :src="EvalJson(item.event.json).song.album.picUrl" alt="">
            <div>
              <i class="iconfont iconbofang3"></i>
            </div>
          </div>
          <span slot="top" >{{EvalJson(item.event.json).song.name}}  {{TransName(EvalJson(item.event.json).song.transNames)}}</span>
          <span slot="bottom">{{Artist(EvalJson(item.event.json).song.artists)}}</span>
        </share-base>
      </div>
      <!-- 转发歌单 -->
      <div class="dynamic-center-content-event-content" v-if="EvalJson(item.event.json).playlist">
         <share-base class="dynamic-center-content-share-forward">
          <div slot="left" class="share-base-left">
            <img :src="EvalJson(item.event.json).playlist.coverImgUrl" alt="">
          </div>
          <div slot="top" class="share-base-songlist">
            <div class="share-base-list">歌单</div>
            <div class="share-base-list-name">{{EvalJson(item.event.json).playlist.name}}</div>
          </div>
          <span slot="bottom">by {{EvalJson(item.event.json).playlist.creator.nickname}}</span>
        </share-base>
      </div>
      <!-- 转发专辑 -->
      <div class="dynamic-center-content-event-content" v-if="EvalJson(item.event.json).album">
        <share-base class="dynamic-center-content-share-forward">
          <div slot="left" class="share-base-left">
            <img :src="EvalJson(item.event.json).album.picUrl" alt="">
            <div>
              <i class="iconfont iconbofang3"></i>
            </div>
          </div>
          <span slot="top" >{{EvalJson(item.event.json).album.name}}  {{TransName(EvalJson(item.event.json).album.transNames)}}</span>
          <span slot="bottom">{{Artist(EvalJson(item.event.json).album.artists)}}</span>
        </share-base>
      </div>
    </div>



      <ul class="dynamic-bottom-icon">
        <li class="li-one">
          <i class="iconfont iconxin"></i>
          <span>转发
            {{events[index].info.commentThread.shareCount}}
          </span>
        </li>
        <li>
          <i class="iconfont iconpinglun"></i>
          <span>评论
            {{events[index].info.commentThread.commentCount}}
          </span>
        </li>
        <li>
          <i class="iconfont iconzan1"></i>
          <span>
            {{events[index].info.commentThread.likedCount}}
          </span>
        </li>
        <li class="li-four">
          <i class="iconfont icongengduo"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import shareBase from "../../base/share/sharebase"
import shareVideo from "../../base/video/sharevideo"
export default {
  components: {
    shareBase,
    shareVideo
  },
  props: {
    item: {
      type:Object,
      default:{}
    },
    events: {
      type:Array,
      default:[]
    },
    index: {
      type:Number,
      default:-1
    },
  },
  data() {
    return {
      song:false
    }
  },
  watch: {
    // events (evs) {
      
    // }
  },
  computed: {},
  methods: {
    Test (num) {
      let type = ''
      switch (num) {
        case 13:
          type = "分享歌单:"
          break
        case 18:
          type = "分享单曲:"
          break
        case 19:
          type = "分享专辑:"
          break
        case 22:
        type = "转发:"
          break
        case 31:
        type = "分享评论"
          break
        case 35:
        type = ":"
          break
        case 39:
        type = "发布视频:"
          break
        case 41:
          type = "分享视频:"
          break
        default: 
          type = ":"
      }
      return type
    },
      Artist (artists) {
        if(!artists) return
        let arr = []
        for(let i = 0; i < artists.length; i++) {
          arr.push(artists[i].name)
        }
        return arr.join('/')
      },
      TransName(transNames) {
        if(!transNames) return
        let arr = []
        for(let i = 0; i < transNames.length; i++) {
          arr.push(transNames[i])
        }
        return arr.join('/')
      },
      durationsTrans (durations) {
        durations = durations / 1000
        durations = durations | 0
        let minute = durations / 60 | 0
        minute = minute < 10 ? '0' + minute : minute
        let second = durations % 60
        second = second < 10 ? '0' + second : second
        return `${minute}:${second}`
      },
      serializeNum (Num) {
        let numStr = Num.toString()
        if (numStr.length < 5) {
          return numStr
        } else if (numStr.length > 8) {
          let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
          return parseFloat(parseInt(Num / 100000000) + '.' + decimal) + '亿'
        } else if (numStr.length > 4) {
          let decimal = numStr.substring(numStr.length - 3, numStr.length - 3)
          return parseFloat(parseInt(Num / 10000) + '.' + decimal) + '万'
        }
      },
      EvalJson (str) {
        // return eval('(' + item.json + ')')
        // return str.parseJSON()
        return JSON.parse(str)
      }   
  
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
 
  .wrapper
    height:auto
    .dynamic-top
      height:60px 
      width:100%
      display:flex
      .dynamic-top-img
        height 60px
        width:70px
        flex-center()
        img 
          height 50px
          width:50px
          border-radius 50%
      .dynamic-right-top
        flex:1  
        .dynamic-right-title
           height:25px
           line-height:25px
           font-size:$font-size-medium
           color:gray
           margin-top:10px
           .dynamic-right-name
             color: #87CEEB
        .dynamic-right-time
          font-size:$font-size-small
          color:gray
          height:20px
          // line-height:20px
    .dynamic-bottom
      height:auto
      margin:0 10px 10px 70px    
      .dynamic-content  
        height:auto
        font-size:$font-size-medium
        line-height:1.4
        multiline-ellipsis($num=10)
        margin-top:-5px
        margin-bottom:5px
      .dynamic-center-content
        height:auto
        .dynamic-center-content-share
          width:290px
          background-color:rgba(128,128,128,.2)
          .share-base-left
            position:relative
            // display:flex
            img 
              width:40px
              height:40px
              border-radius:5px
            div
              position:absolute
              left: 10px
              top:10px
              width:23px
              height:23px
              background-color: rgba(255,255,255,.5)
              border-radius:50%
              i 
                font-size:$font-size-small
                color:yellow
                position:absolute
                top:-14px
                left:5px
          .share-base-songlist
            display:flex
            .share-base-list
              color:red
              font-size:$font-size-small
              width:25px
              height:15px
              border-radius 3px
              border:1px solid red
              flex-center()
              margin-right:5px
            .share-base-list-name
              ellipsis()
              width:200px
      .dynamic-bottom-icon
        display:flex
        height 30px
        line-height:30px
        margin-top:10px
        position: relative
        li
          width:55px
          margin-left:30px
          font-size:$font-size-small
          span 
           margin-left:3px
        .li-one
          margin-left:0   
        .li-four
          position:absolute 
          right:0
          text-align:right 

      .dynamic-center-content
        .dynamic-center-content-video
          height:170px
          img 
            width:100%
            height:100%
            border-radius:10px   

      .dynamic-center-content-event
        height:auto
        background-color:rgba(128,128,128,.2)
        border-radius:5px
        padding:10px auto
        .dynamic-content-event
          padding-top:6px
          padding-bottom:6px
          height:auto
          font-size:$font-size-medium
          line-height:1.4
          white-space: pre-line
          margin:auto 5px
          span:nth-child(1)
           color: #87CEEB
        .dynamic-center-content-event-content
          height:auto
          width:100%
          padding:5px
          line-height:1.3
          .dynamic-center-content-event-video
            height:160px
            width:96%
            line-height:1
            img 
              width:100%
              height:100%
              border-radius:10px  
          .dynamic-center-content-share-forward
             width:96%
             background-color:white    
             .share-base-left
              position:relative
              img 
                width:40px
                height:40px
                border-radius:5px
              div
                position:absolute
                left: 10px
                top:10px
                width:23px
                height:23px
                background-color: rgba(255,255,255,.5)
                border-radius:50%
                i 
                  font-size:$font-size-small
                  color:yellow
                  position:absolute
                  top:-14px
                  left:5px
            .share-base-songlist
              display:flex
              .share-base-list
                color:red
                font-size:$font-size-small
                width:25px
                height:15px
                border-radius 3px
                border:1px solid red
                flex-center()
                margin-right:5px
              .share-base-list-name
                ellipsis()
                width:200px  
          
</style>