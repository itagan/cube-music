<template>
  <div class="wrapper">
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :options="options">
        <div class="my-inter" v-if="multimatch.orders"> 
          <div class="my-inter-top">你可能感兴趣</div>
          <follow-base class="my-inter-bottom" v-if="multimatch.artist">
            <img :src="multimatch.artist[0].img1v1Url" alt="" slot="left" class="img"> 
            <div slot="top" class="my-follow-center-top">
              歌手: {{multimatch.artist[0].name}}
            </div>
            <div slot="bottom">
              粉丝: {{Num(multimatch.artist[0].fansSize)}}
              歌曲: {{Num(multimatch.artist[0].musicSize)}}
              专辑: {{Num(multimatch.artist[0].albumSize)}}
            </div>
            <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
          </follow-base>

          <follow-base class="my-inter-bottom" v-if="multimatch.album">
            <img :src="multimatch.album[0].picUrl" alt="" slot="left" class="img"> 
            <div slot="top" class="my-follow-center-top">
              专辑: {{multimatch.album[0].name}}
            </div>
            <div slot="bottom">
              {{multimatch.album[0].artist.name}}
            </div>
            <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
          </follow-base>
        </div>

        <ul class="my-songs">
          <li class="my-songs-top">
            <div class="my-songs-top-left">单曲</div>
            <div class="my-songs-top-right">播放全部</div>
          </li>
          <li v-for="item in songs" :key="item.id">
            <song-base class="my-songs-base">
              <i slot="left" class="iconfont iconlaba" @click.stop="toIt" v-if="isPlay"></i>
              <div slot="top">
                {{item.name}}
              </div>
              <div slot="center">
                  {{item.ar[0].name}} - {{item.al.name}}
                </div>
                <div slot="bottom" v-if="item.alias && item.alias.length">
                  {{TransAlias(item.alias)}}
                </div>
              <i slot="rightPlay" class="iconfont iconbofang2" @click.stop="toIt"></i>
              <i slot="rightMore" class="iconfont icon-ellipsis" @click.stop="toIt"></i>
            </song-base> 
          </li>
          <li class="my-bottom" v-if="song.more" @click.stop="toUsers(1)">
            <span>{{song.moreText}}</span>
            <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="my-video">
          <li class="my-top">
           视频
          </li>
          <li v-for="(item,index) in video.videos" :key="index" @click="selectItem(item.vid)">
            <sub-video :item="item"></sub-video>
          </li>
           <li class="my-bottom" v-if="video.more" @click.stop="toUsers(6)">
            <span>{{video.moreText}}</span>
            <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>
        <ul class="my-playlist">
          <li class="my-top">
           歌单
          </li>
          <li v-for="(item,index) in playList.playLists" :key="index" @click="selectItem(item.vid)">
            <list-base>
              <img v-lazy="item.coverImgUrl" alt="" slot="left" class="img"> 
              <div slot="top">
                {{item.name}}
              </div>
              <div slot="bottom">
                {{item.trackCount}}首音乐
                by
                {{item.creator.nickname}},
                播放{{Num(item.playCount)}}次
              </div>
            </list-base>
          </li>
           <li class="my-bottom" v-if="playList.more" @click.stop="toUsers(3)">
            <span>{{playList.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

          <ul class="my-sim_query">
          <li class="my-top">
           相关搜索
          </li>  
          <li class="my-sim_query-ul">
            <ul>
              <li v-for="(item,index) in sim_query.sim_querys" :key="index" class="my-sim_query-li">
               {{item.keyword}}
              </li>
            </ul>
          </li>
        </ul>

         <ul class="my-mlogs">
          <li class="my-top">
           Mlog
          </li> 
          <li class="my-mlogs-li">
            <ul>
              <li v-for="(item,index) in mlog.mlogs" :key="index">
                <log-base :item="item"></log-base>
              </li>
            </ul>
          </li>
           <li class="my-bottom" v-if="mlog.more" @click.stop="toUsers(2)">
            <span>{{mlog.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="my-playlist">
          <li class="my-top">
           主题
          </li>
          <li v-for="(item,index) in talk.talks" :key="index" @click="selectItem(item.vid)" class="li">
            <follow-base>
              <img v-lazy="item.showCover.url" alt="" slot="left" class="img"> 
              <div slot="top">
                # {{item.talkName}}
              </div>
              <div slot="bottom">
                {{item.follows}}人关注
                {{item.participations}}人参与
              </div>
              <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
            </follow-base>
          </li>
           <li class="my-bottom" v-if="talk.more" @click.stop="toUsers(2)">
            <span>{{talk.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="my-singers">
          <li class="my-top">
           歌手
          </li>
          <li v-for="(item,index) in artist.artists" :key="index" @click="selectItem(item.vid)" class="li">
            <follow-base class="my-singers-base">
              <img v-lazy="item.img1v1Url" alt="" slot="left" class="img"> 
              <div slot="liRight">
               {{item.name}}
               <span class="li-right" v-if="item.alias.length">({{TransAlias(item.alias)}})</span>
              </div>
              <div slot="rightFollow" class="right-share">
                <i class="iconfont iconwodeshoucang"></i>
                <span>已入驻</span>
              </div>
            </follow-base>
          </li>
           <li class="my-bottom" v-if="artist.more" @click.stop="toUsers(4)">
            <span>{{artist.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

         <ul class="my-albums">
            <li class="my-top">
            专辑
            </li>
            <li v-for="(item,index) in album.albums" :key="index" @click="selectItem(item.vid)" class="li">
              <album-base class="my-album">
                <div class="left-img" slot="left">
                  <img v-lazy="item.picUrl" alt="">
                </div>
                <div slot="top">
                  {{item.name}}
                </div>
                <div slot="bottom">
                  {{item.artist.name}}
                  {{Timestamp(item.publishTime)}}
                </div>
              </album-base>
            </li>
            <li class="my-bottom" v-if="album.more" @click.stop="toUsers(5)">
              <span>{{album.moreText}}</span>
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>

          <ul class="my-playlist">
            <li class="my-top">
            电台
            </li>
            <li v-for="(item,index) in djRadio.djRadios" :key="index" @click="selectItem(item.vid)">
              <list-base>
                <img v-lazy="item.picUrl" alt="" slot="left" class="img"> 
                <div slot="top">
                  # {{item.name}}
                </div>
                <div slot="bottom">
                  {{item.dj.nickname}}
                </div>
              </list-base>
            </li>
            <li class="my-bottom" v-if="djRadio.more"  @click.stop="toUsers(8)">
              <span>{{djRadio.moreText}}</span>
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>

          <ul class="my-users">
            <li class="my-top">
            用户
            </li>
            <li v-for="(item,index) in user.users" :key="index" @click.stop="toUser(item.userId, item.userType)" class="li">
              <follow-base class="my-users-base">
                <img v-lazy="item.avatarUrl" alt="" slot="left" class="img"> 
                <div slot="top" v-if="item.signature" class="limit">
                <div class="limit-top">{{item.nickname}}</div>
                <i class="iconfont iconnv" v-if="item.gender === 2"></i>
                <i class="iconfont iconnan" v-if="item.gender === 1"></i>
                </div>
                <div slot="bottom" v-if="item.signature" class="limit">
                <div class="limit-bottom"> {{item.signature}}</div>
                </div>
                <div slot="liRight" v-if="!item.signature" class="limit">
                  <div class="limit-top">{{item.nickname}}</div>
                  <i class="iconfont iconnv" v-if="item.gender === 2"></i>
                  <i class="iconfont iconnan" v-if="item.gender === 1"></i>
                </div>
                <div slot="rightFollow" class="right-follow" v-if="!item.followed" @click.stop="toFollow(item.userId, index)">
                  <i class="iconfont iconjia"></i>
                  <span>关注</span>
                </div>
                <div slot="rightFollow" class="right-followed" v-if="item.followed">
                  <i class="iconfont iconshoucangchenggong"></i>
                  <span>已关注</span>
                </div>
            </follow-base>
            </li>
            <li class="my-bottom" v-if="user.more" @click.stop="toUsers(9)">
              <span>{{user.moreText}}</span>
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>
      </cube-scroll>
    </div>     
  </div>
</template>

<script>
import followBase from '../../base/swiper/followbase'
import songBase from '../../base/swiper/searchsong'
import subVideo from '../../base/swiper/subvideo'
import listBase from '../../base/swiper/listbase'
import logBase from '../../base/swiper/logbase'
import albumBase from '../../base/swiper/album'
import {timestamp} from '../../assets/js/timestamp'
import {serializeNumber} from '../../assets/js/number'


export default {
  components: {
    followBase,
    songBase,
    subVideo,
    listBase,
    logBase,
    albumBase
  },
  props: {
    value:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      options: {
        scrollbar: true
      },
      multimatch:{},
      isPlay:false,
      song: {},
      video:{},
      playList:{},
      mlog:{},
      talk:{},
      artist:{},
      sim_query:{},
      album:{},
      djRadio:{},
      user:{},
      songs:[]
    }
  },
  watch: {},
  computed: {},
  methods: {
    getMultimatch (value) {
      this.$api.searchs.searchSuggest(value).then(res => {
        this.multimatch = res.data.result
      })
    },
    getAlls (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.songs = res.data.result.song.songs
        this.song = res.data.result.song
        this.video = res.data.result.video
        this.playList = res.data.result.playList
        this.mlog = res.data.result.mlog
        this.talk = res.data.result.talk
        this.artist = res.data.result.artist
        this.sim_query = res.data.result.sim_query
        this.album = res.data.result.album
        this.djRadio = res.data.result.djRadio
        this.user = res.data.result.user
        console.log(this.mlog.mlogs)
      })
    },
    toIt () {

    },
    TransAlias (alias) {
      let arr = []
      for(let i = 0; i < alias.length; i++) {
        arr.push(alias[i])
      }
      return arr.join('/')
    },
    Timestamp (time) {
      return timestamp(time)
    },
    Num (num) {
      return serializeNumber(num)
    },
    toFollow (userId, index) {
      this.$api.users.toFollow(userId, 1).then(res => {
        if(res.data.code === 200) {
          this.user.users[index].followed = true
        }
      })
    },
    toUser (userId, userType) {
      if(userType === 2 || userType === 4) {
        this.$api.users.userdetail(userId).then(res => {
          let id = res.data.profile.artistId
          this.$router.push({
            path: `/singer/${userId}/${id}`
          })
        })
      }else {
        this.$router.push({
        path: `/user/${userId}`
      })
      }
    },
    toUsers (i) {
      this.$emit('changeIndex',i)
    }
  },
  created() {
    // this.getMultimatch (this.value)
    // this.getAlls(this.value, 60, 0, 1018)
  },
  mounted() {
    this.getMultimatch (this.value)
    this.getAlls(this.value, 60, 0, 1018)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:auto
    .scroll-list-wrap
      height:567px  
      position:relative
      top:15px
      width:375px 
      font-size:$font-size-medium
      background-color:white
      .my-inter
        height:auto
        .my-inter-top
          padding-left:10px
          margin:10px auto
        .my-inter-bottom
          img 
            height:45px
            width:45px
            border-radius:50%
      .my-songs
        height:auto 
        li
          border-bottom:.5px solid rgba(128,128,128,.1)
        .my-songs-top
          height:40px 
          line-height:40px
          flex-between()
          .my-songs-top-left
            margin-left:10px
            font-weight:bold
            font-size:$font-size-medium-x
          .my-songs-top-right
            margin-right:10px 
            border-radius:12.5px
            height:25px
            width:75px
            border:1px solid rgba(128,128,128,.2)
            flex-center()
        .my-songs-base
          height:100%    
          width:100% 
      .my-video
        width:100%
        background-color:white
      .my-playlist
        li
          img 
            width:65px
            height:65px 
            border-radius:5px
      .my-mlogs
        height:auto
        width:100%
        .my-mlogs-li
          width:100%
          ul
            display:flex  
      .my-singers
        .li
          .my-singers-base
            img  
              height:100%
              width:100%
              border-radius:50%
            .right-share
              font-size:$font-size-small
              color:gray
              i 
               font-size:$font-size-small
               color:red
            .li-right
              font-size:$font-size-small
              color:gray  
      .my-sim_query
        margin-bottom:10px
        .my-sim_query-ul
          ul
            display:flex
            flex-wrap:wrap
            .my-sim_query-li
              height:20px
              width:auto
              padding:0 10px
              border-radius:10px 
              background-color:rgba(128,128,128,.1)
              flex-center()
              font-size:$font-size-medium
              margin:5px 10px
      .my-albums
        li
         .my-album
           .left-img
            position:absolute
            width:65px
            height:65px
            z-index:100
            img
              width:100%
              height:100%
              border-radius:5px
      .my-users
        margin-bottom:30px
        .li
          .my-users-base
            img  
              height:100%
              width:100%
              border-radius:50%
            .limit
              display:flex
              .limit-top
                max-width:158px
                ellipsis()  
                margin-right:15px
              .limit-bottom
                max-width:220px
                ellipsis()  
              i
                font-size:$font-size-small 
              .iconnv
                color:pink
              .iconnan
                color:blue  
            .right-follow
              height:22px
              width:62px
              border:1px solid red
              border-radius:11px
              flex-center()
              font-size:$font-size-small
              color:red
            .right-followed
              height:22px
              width:62px
              border:1px solid gray
              border-radius:11px
              flex-center()
              font-size:$font-size-small
              color:gray 

      .my-top
        height:40px 
        line-height:40px 
        font-weight:bold
        font-size:$font-size-medium-x 
        margin-left:10px  
      .my-bottom
        height:40px 
        text-align:center
        font-size:$font-size-small
        color:gray   
        flex-center()
      .li
        margin-bottom:10px  
</style>