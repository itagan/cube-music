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
        <div class="dynamic-right-time">{{timestamp(events[index].eventTime)}}</div>
      </div>
    </div>
    <div class="dynamic-bottom">
      <div class="dynamic-content">
        <!-- <span v-if="events[index].actName">
        {{item.msg.substring(0,FindStr(item.msg)[0])}}
        <span style="color:#87CEEB">
          {{item.msg.substring(FindStr(item.msg)[0],FindStr(item.msg)[1]+1)}}
        </span>
        {{item.msg.substring(FindStr(item.msg)[1]+1)}}		
        </span>
        <span v-if="!events[index].actName">{{item.msg}}</span> -->
        <span>{{item.msg}}</span>
        <span v-if= "item.event && item.event.type === 31">
          //
          <span style="color:#87ceeb">{{'@'+ item.event.user.nickname}}</span>
          <span>{{Test(item.event.type)}}</span>
          <span>{{EvalJson(item.event.json).msg}}</span>
        </span>
      </div>
      <!-- 动态：图文形式 -->
      <!-- v-if="events[index].type === 35" -->
      <div class="dynamic-center-content">
        <div v-if="events[index].pics.length === 1" class="dynamic-center-content-img-one">
          <img :src="events[index].pics[0].originUrl" alt="" :style="{height:145 / events[index].pics[0].width * events[index].pics[0].height}" >
        </div>
         <div v-if="events[index].pics.length === 2" class="dynamic-center-content-img-two">
          <img :src="events[index].pics[0].squareUrl" alt="" >
          <img :src="events[index].pics[1].squareUrl" alt="" >
        </div>
         <div v-if="events[index].pics.length === 3" class="dynamic-center-content-img-three">
          <img :src="events[index].pics[0].squareUrl" alt="" >
          <img :src="events[index].pics[1].squareUrl" alt="" >
          <img :src="events[index].pics[2].squareUrl" alt="" >
        </div>
        <div v-if="events[index].pics.length === 4" class="dynamic-center-content-img-four">
          <div>
            <img :src="events[index].pics[0].squareUrl" alt="" >
            <img :src="events[index].pics[1].squareUrl" alt="" >
            <img :src="events[index].pics[2].squareUrl" alt="" >
            <img :src="events[index].pics[3].squareUrl" alt="" >
          </div>
        </div>
         <div v-if="events[index].pics.length === 5" class="dynamic-center-content-img-five">
          <div class="five-img-top">
            <img :src="events[index].pics[0].squareUrl" alt="" >
            <img :src="events[index].pics[1].squareUrl" alt="" >
          </div>
          <div class="five-img-bottom">
            <img :src="events[index].pics[2].squareUrl" alt="" >
            <img :src="events[index].pics[3].squareUrl" alt="" >
            <img :src="events[index].pics[4].squareUrl" alt="" >
          </div>
        </div>
        <div v-if="events[index].pics.length === 6" class="dynamic-center-content-img-six">
            <img :src="events[index].pics[0].squareUrl" alt="" >
            <img :src="events[index].pics[1].squareUrl" alt="" >
            <img :src="events[index].pics[2].squareUrl" alt="" >
            <img :src="events[index].pics[3].squareUrl" alt="" >
            <img :src="events[index].pics[4].squareUrl" alt="" >
            <img :src="events[index].pics[5].squareUrl" alt="" >
        </div>
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
      <!-- 分享节目 -->
      <div class="dynamic-center-content" v-if="item.program">
        <share-base class="dynamic-center-content-share">
          <div slot="left" class="share-base-left">
            <img :src="item.program.coverUrl" alt="">
            <div>
              <i class="iconfont iconbofang3"></i>
            </div>
          </div>
          <span slot="top" >{{item.program.name}}</span>
          <span slot="bottom"><span class="music-story">{{item.program.channels[0]}}</span><span>{{item.program.radio.name}}</span></span>
        </share-base>
      </div>
       <!-- 分享歌手 -->
      <div class="dynamic-center-content" v-if="events[index].type === 36">
        <share-base class="dynamic-center-content-share">
          <div slot="left" class="share-base-left">
            <img :src="item.resource.picUrl" alt="">
          </div>
          <span slot="liRight">歌手:{{item.resource.name}}</span>
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
      <!-- 分享评论 -->
      <div class="dynamic-center-content dynamic-comment" v-if="events[index].type === 31">
        <div class="dynamic-comment-marks">”</div>
        <div class="dynamic-comment-content">
          <span>{{'@'+ item.resource.user.nickname+':'}}</span>
          <span>{{item.resource.content}}</span>
          {{item.resource.resourceType}}
        </div>
        <share-comment class="dynamic-comment-content-base" v-if="item.resource.resourceType === 0 || item.resource.resourceType === 3">
          <img :src="EvalJson(item.resource.resourceJson).imgUrl" alt="" slot="leftImg">
          <div slot="right" class="dynamic-comment-content-base-right">{{item.resource.resourceName}}</div>
        </share-comment>
        <share-comment class="dynamic-comment-content-base" v-if="item.resource.resourceType === 4">
          <img :src="EvalJson(item.resource.resourceInfo).album.img80x80" alt="" slot="leftMusic">
          <div slot="right" class="dynamic-comment-content-base-right">{{item.resource.resourceName}}</div>
        </share-comment>
        <share-comment class="dynamic-comment-content-base" v-if="item.resource.resourceType === 62">
          <img :src="EvalJson(item.resource.resourceJson).imgUrl" alt="" slot="leftVideo">
          <div slot="right" class="dynamic-comment-content-base-right-video">{{item.resource.resourceName}}</div>
        </share-comment>
        
      </div>
      <!-- 转发动态 -->
    <div class="dynamic-center-content-event" v-if="item.event">
      <div class="dynamic-content-event" v-if="item.event.type !== 31">
        <span>{{'@'+ item.event.user.nickname}}</span>
        <span>{{Test(item.event.type)}}</span>
        <span>{{EvalJson(item.event.json).msg}}</span>
      </div>
      <!-- 转发图文展示 -->
      <div class="dynamic-center-content">
        <div v-if="item.event.pics.length === 1" class="dynamic-center-content-img-one dynamic-center-content-img-forward">
          <img :src="item.event.pics[0].originUrl" alt="" :style="{height:145 / item.event.pics[0].width * item.event.pics[0].height}" >
        </div>
         <div v-if="item.event.pics.length === 2" class="dynamic-center-content-img-two dynamic-center-content-img-forward">
          <img :src="item.event.pics[0].squareUrl" alt="" >
          <img :src="item.event.pics[1].squareUrl" alt="" >
        </div>
         <div v-if="item.event.pics.length === 3" class="dynamic-center-content-img-three dynamic-center-content-img-forward">
          <img :src="item.event.pics[0].squareUrl" alt="" >
          <img :src="item.event.pics[1].squareUrl" alt="" >
          <img :src="item.event.pics[2].squareUrl" alt="" >
        </div>
        <div v-if="item.event.pics.length === 4" class="dynamic-center-content-img-four dynamic-center-content-img-forward">
          <div>
            <img :src="item.event.pics[0].squareUrl" alt="" >
            <img :src="item.event.pics[1].squareUrl" alt="" >
            <img :src="item.event.pics[2].squareUrl" alt="" >
            <img :src="item.event.pics[3].squareUrl" alt="" >
          </div>
        </div>
         <div v-if="item.event.pics.length === 5" class="dynamic-center-content-img-five dynamic-center-content-img-forward">
          <div class="five-img-top">
            <img :src="item.event.pics[0].squareUrl" alt="" >
            <img :src="item.event.pics[1].squareUrl" alt="" >
          </div>
          <div class="five-img-bottom">
            <img :src="item.event.pics[2].squareUrl" alt="" >
            <img :src="item.event.pics[3].squareUrl" alt="" >
            <img :src="item.event.pics[4].squareUrl" alt="" >
          </div>
        </div>
        <div v-if="item.event.pics.length === 6" class="dynamic-center-content-img-six dynamic-center-content-img-forward">
            <img :src="item.event.pics[0].squareUrl" alt="" >
            <img :src="item.event.pics[1].squareUrl" alt="" >
            <img :src="item.event.pics[2].squareUrl" alt="" >
            <img :src="item.event.pics[3].squareUrl" alt="" >
            <img :src="item.event.pics[4].squareUrl" alt="" >
            <img :src="item.event.pics[5].squareUrl" alt="" >
        </div>
      </div>
       <!-- 转发评论 -->
      <div class="dynamic-center-content dynamic-comment" v-if="item.event.type === 31">
        <div class="dynamic-comment-marks">”</div>
        <div class="dynamic-comment-content">
          <span>{{'@'+ EvalJson(item.event.json).resource.user.nickname+':'}}</span>
          <span>{{EvalJson(item.event.json).resource.content}}</span>
        </div>
        <share-comment class="dynamic-comment-content-base" v-if="EvalJson(item.event.json).resource.resourceType === 0 || EvalJson(item.event.json).resource.resourceType === 3">
          <img :src="EvalJson(EvalJson(item.event.json).resource.resourceJson).imgUrl" alt="" slot="leftImg">
          <div slot="right" class="dynamic-comment-content-base-right">{{EvalJson(item.event.json).resource.resourceName}}</div>
        </share-comment>
        <share-comment class="dynamic-comment-content-base" v-if="EvalJson(item.event.json).resource.resourceType === 4">
          <img :src="EvalJson(EvalJson(item.event.json).resource.resourceInfo).album.img80x80" alt="" slot="leftMusic">
          <div slot="right" class="dynamic-comment-content-base-right">{{EvalJson(item.event.json).resource.resourceName}}</div>
        </share-comment>
        <share-comment class="dynamic-comment-content-base" v-if="EvalJson(item.event.json).resource.resourceType === 62">
          <img :src="EvalJson(EvalJson(item.event.json).resource.resourceJson).imgUrl" alt="" slot="leftVideo">
          <div slot="right" class="dynamic-comment-content-base-right-video">{{EvalJson(item.event.json).resource.resourceName}}</div>
        </share-comment>
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
      <!-- 转发分享的歌手动态 -->
       <div class="dynamic-center-content-event-content" v-if="item.event.type === 36">
       
        <share-base class="dynamic-center-content-share-forward">
          <div slot="left" class="share-base-left">
            <img :src="EvalJson(item.event.json).resource.picUrl" alt="">
          </div>
          <span slot="liRight" >歌手:{{EvalJson(item.event.json).resource.name}}</span>
        </share-base>
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
      <!-- 转发节目 -->
      <div class="dynamic-center-content-event-content" v-if="EvalJson(item.event.json).program">
        <share-base class="dynamic-center-content-share-forward">
          <div slot="left" class="share-base-left">
            <img :src="EvalJson(item.event.json).program.coverUrl" alt="">
            <div>
              <i class="iconfont iconbofang3"></i>
            </div>
          </div>
          <span slot="top" >{{EvalJson(item.event.json).program.name}}</span>
          <span slot="bottom"> <span class="music-story">{{EvalJson(item.event.json).program.channels[0]}}</span> <span>{{EvalJson(item.event.json).program.radio.name}}</span></span>
        </share-base>
      </div>
    </div>

      <ul class="dynamic-bottom-icon">
        <li class="li-one" @click="forward">
          <i class="iconfont iconxin"></i>
          <span>转发
            {{events[index].insiteForwardCount}}
          </span>
        </li>
        <li @click="comment">
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
import shareBase from '../../base/share/sharebase'
import shareVideo from '../../base/video/sharevideo'
import shareComment from '../../base/share/sharecomment'
import forWard from './forward'
import {mapActions} from 'vuex'
import {timestampOther} from '../../assets/js/timestamp'

export default {
  components: {
    shareBase,
    shareVideo,
    shareComment
  },
  props: {
    item: {
      type: Object,
      default: {}
    },
    events: {
      type: Array,
      default: []
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      song: false,
      evId: '',
      uid: 0
    }
  },
  watch: {},
  computed: {},
  methods: {
    Test (num) {
      let type = ''
      switch (num) {
        case 13:
          type = '分享歌单:'
          break
        case 18:
          type = '分享单曲:'
          break
        case 19:
          type = '分享专辑:'
          break
        case 22:
          type = '转发:'
          break
        case 31:
          type = '分享评论:'
          break
        case 35:
          type = ':'
          break
        case 36:
          type = '分享歌手:'
          break
        case 39:
          type = '发布视频:'
          break
        case 41:
          type = '分享视频:'
          break
        default:
          type = ':'
      }
      return type
    },
    Artist (artists) {
      if (!artists) return
      let arr = []
      for (let i = 0; i < artists.length; i++) {
        arr.push(artists[i].name)
      }
      return arr.join('/')
    },
    TransName (transNames) {
      if (!transNames) return
      let arr = []
      for (let i = 0; i < transNames.length; i++) {
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
    },
    FindStr (str) {
      let arr = []
      let ind = str.indexOf('#')
      while (ind !== -1) {
        arr.push(ind)
        ind = str.indexOf('#', ind + 1)
      }
      if (arr.length >= 2) {
        if (arr.length - 1 === arr[1]) return
        if (str.substring(arr[0], arr[1] + 1)) {
          return arr
        }
      }
    },
    forward () {
      this.uid = 477726475
      this.evId = this.events[this.index].id
      this.$router.push({
        path: `/forward/${this.uid}/${this.evId}`
      })
    },
    comment () {
      this.saveDynamic(this.events[this.index])
      let obj = {}
      obj = this.events[this.index].user
      this.saveAuthor(obj)
      this.$router.push({
        path: `/dynamiccomment`
      })
    },
    timestamp (time) {
      return timestampOther(time)
    },
    ...mapActions([
      'saveDynamic',
      'saveAuthor'
    ])
  },
  created () {},
  mounted () {}
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
        margin-bottom:15px
      .dynamic-center-content
        height:auto
        .dynamic-center-content-share
          width:290px
          background-color:rgba(128,128,128,.2)
          margin-top:5px
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
          
    .dynamic-bottom 
      .dynamic-center-content
      .dynamic-center-content-event-content   
        .dynamic-center-content-img-one
          width:145px
          max-height:230px
          img
           width:145px
           border-radius:5px
           max-height:230px  
        .dynamic-center-content-img-two
          width:140px
          height:140px
          img
           width:100%
           height:100%
           border-radius:5px 
        .dynamic-center-content-img-three
          width:90px
          height:90px
          img
           width:100%
           height:100%
           border-radius:5px  
        .dynamic-center-content-img-four
          div
            height:210px
            width:210px
            display:flex
            flex-wrap:wrap
            img
              width:48%
              height:48%
              border-radius:5px
            img:nth-child(2n+1)
              margin-right:5px 
        .dynamic-center-content-img-five
          .five-img-top
            height:140px
            width:100%
            img
              width:47%
              height:100%
              border-radius:5px
            img:nth-child(1)  
              margin-right:5px
          .five-img-bottom
            height:92px
            width:100%
            img
              width:31.5%
              height:100%
              border-radius:5px
        .dynamic-center-content-img-six
          display:flex
          flex-wrap:wrap
          img
            width:31.5%
            height:47%
            border-radius:5px
          img:nth-child(2)  
              margin:0 5px
              margin-bottom:5px
          img:nth-child(5)  
              margin:0 5px 
              margin-bottom:5px
        .dynamic-center-content-img-forward
          margin:auto 5px   


       .music-story
         width:auto
         padding:auto 3px
         height:13px
         border:1px solid red
         color:red
         font-size:$font-size-small 
         line-height:13px
         text-align:center
         margin-right:3px
                
    .dynamic-bottom 
        .dynamic-comment
          height:auto
          border:1px solid gray 
          border-radius:5px
          position:relative
          background-color:white
          .dynamic-comment-marks
            width:30px
            height:40px
            line-height:1.6
            background-color:white
            position:absolute
            right:5px
            top:-20px
            font-size:40px
            color:gray
            text-align:center
            z-index:1
          .dynamic-comment-content
            height:auto
            white-space: normal
            margin:15px
            margin-top:20px
            font-size:$font-size-medium
            line-height:1.4
            span:nth-child(1)
              color:#87ceeb
          .dynamic-comment-content-base
            .dynamic-comment-content-base-right
              max-width:230px
              ellipsis()
            .dynamic-comment-content-base-right-video
              max-width:210px
              ellipsis()  
    

                


</style>