<template>
  <div class="wrapper">
    <div class="pullloadtop" v-if="!order.length"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">没有找到结果哈，请重新搜索其它试试</span>
     </div> 

    <div class="scroll-list-wrap" v-else>
      <cube-scroll
        ref="scroll"
        :options="options">
        <div class="my-inter" v-if="multimatch.orders && multimatch.orders.length"> 
          <div class="my-inter-top">你可能感兴趣</div>
          <base-auto class="my-inter-bottom" v-if="multimatch.artist">
            <img :src="multimatch.artist[0].img1v1Url" alt="" slot="left" class="img"> 
            <div slot="top" class="my-follow-center-top" @click.stop="toSinger(multimatch.artist[0].id)">
              歌手: {{multimatch.artist[0].name}}
            </div>
            <div slot="bottom" @click.stop="toSinger(multimatch.artist[0].id)">
              粉丝: {{Num(multimatch.artist[0].fansSize)}}
              歌曲: {{Num(multimatch.artist[0].musicSize)}}
              专辑: {{Num(multimatch.artist[0].albumSize)}}
            </div>
            <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toSinger(multimatch.artist[0].id)"></i>
          </base-auto>
          <base-auto class="my-inter-bottom" v-if="multimatch.user">
            <img :src="multimatch.user[0].avatarUrl" alt="" slot="left" class="img"> 
            <div slot="top" class="my-follow-center-top" @click.stop="toUser(multimatch.user[0].userId, multimatch.user[0].userType)">
               用户: {{multimatch.user[0].name}}
            </div>
            <div slot="bottom" @click.stop="toUser(multimatch.user[0].userId, multimatch.user[0].userType)">
              粉丝: {{Num(multimatch.user[0].fansSize)}}
            </div>
            <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toSinger(multimatch.artist[0].id)"></i>
          </base-auto>

          <base-auto class="my-inter-bottom" v-if="multimatch.album"  @click.stop="toAlbum(multimatch.album[0].id)">
            <img :src="multimatch.album[0].picUrl" alt="" slot="left" class="img"> 
            <div slot="top" class="my-follow-center-top"  @click.stop="toAlbum(multimatch.album[0].id)">
              专辑: {{multimatch.album[0].name}}
            </div>
            <div slot="bottom"  @click.stop="toAlbum(multimatch.album[0].id)">
              {{multimatch.album[0].artist.name}}
            </div>
            <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
          </base-auto>

          <base-auto class="my-inter-video" v-if="multimatch.video">
            <div slot="left" class="my-video-wrap">
               <img :src="multimatch.video[0].coverUrl" alt="" class="img">
               <div class="my-video-bg">
                 <i class="iconfont iconbofang4"></i>
               </div>
            </div> 
            <div slot="top" class="my-follow-center-top">
              <div class="mv">MV</div> 视频: <div>{{multimatch.video[0].title}}</div>
            </div>
            <div slot="bottom">
              {{multimatch.video[0].creator[0].userName}}
            </div>
            <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
          </base-auto>

          <base-auto class="my-inter-video" v-if="multimatch.video" v-show="!multimatch.video">
            <img :src="multimatch.video[0].coverUrl" alt="" slot="left" class="img"> 
            <div slot="top" class="my-follow-center-top">
              视频: {{multimatch.video[0].title}}
            </div>
            <div slot="bottom">
              {{multimatch.video[0].creator[0].userName}}
            </div>
            <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
          </base-auto>
        </div>

        <ul class="my-songs" v-if="song.songs">
          <li class="my-songs-top">
            <div class="my-songs-top-left">单曲</div>
            <div class="my-songs-top-right">播放全部</div>
          </li>
          <li v-for="(item, index) in song.songs" :key="item.id"  @click.stop="toCheckMusic(item, index)">
            <song-base class="my-songs-base">
              <i slot="left" class="iconfont iconlaba" @click.stop="toIt" v-if="index === currentIndex"></i>
              <div slot="top" class="limit" :style="[index === currentIndex ? {color:'red'} : '']">
                <div class="limit-top">{{item.name}}</div>
              </div>
              <div slot="center" class="limit">
                <div class="limit-bottom">{{item.ar[0].name}} - {{item.al.name}}</div>
              </div>
              <div slot="bottom" v-if="item.alias && item.alias.length" class="limit">
                <div class="limit-bottom">{{TransAlias(item.alias)}}</div>
              </div>
              <i slot="rightPlay" class="iconfont iconbofang2" v-show="item.mv !== 0" @click.stop="toIt"></i>
              <i slot="rightMore" class="iconfont icon-ellipsis" @click.stop="toMoreOpera(item)"></i>
            </song-base> 
          </li>
          <li class="my-bottom" v-if="song.more" @click.stop="toChanges(1)">
            <span>{{song.moreText}}</span>
            <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="my-video" v-if="video.videos">
          <li class="my-top">
           视频
          </li>
          <li v-for="(item,index) in video.videos" :key="index">
            <sub-video :item="item"></sub-video>
          </li>
           <li class="my-bottom" v-if="video.more" @click.stop="toChanges(6)">
            <span>{{video.moreText}}</span>
            <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>
        <ul class="my-playlist" v-if="playList.playLists">
          <li class="my-top">
           歌单
          </li>
          <li v-for="(item,index) in playList.playLists" :key="index" @click.stop="toList(item.id)">
            <list-base>
              <img v-lazy="item.coverImgUrl" alt="" slot="left" class="img"> 
              <div slot="top" class="limit">
               <div class="limit-top">{{item.name}}</div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom">
                 {{item.trackCount}}首音乐
                by
                {{item.creator.nickname}},
                播放{{Num(item.playCount)}}次
                </div>
              </div>
            </list-base>
          </li>
           <li class="my-bottom" v-if="playList.more" @click.stop="toChanges(3)">
            <span>{{playList.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

          <ul class="my-sim_query" v-if="sim_query.sim_querys">
          <li class="my-top">
           相关搜索
          </li>  
          <li class="my-sim_query-ul">
            <ul>
              <li v-for="(item,index) in sim_query.sim_querys" :key="index" class="my-sim_query-li" @click.stop="toSearch(item.keyword)">
               {{item.keyword}}
              </li>
            </ul>
          </li>
        </ul>

         <ul class="my-mlogs" v-if="mlog.mlogs">
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
           <li class="my-bottom" v-if="mlog.more" @click.stop="toChanges(2)">
            <span>{{mlog.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="my-playlist" v-if="talk.talks">
          <li class="my-top">
           主题
          </li>
          <li v-for="(item,index) in talk.talks" :key="index" class="li">
            <follow-base>
              <img :src="item.showCover.url" alt="" slot="left" class="img"> 
              <div slot="top" class="limit">
               <div class="limit-top-talks"> # {{item.talkName}}</div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom-talks">
                  {{item.follows}}人关注
                {{item.participations}}人参与
                
                </div>
              </div>
              <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
            </follow-base>
          </li>
           <li class="my-bottom" v-if="talk.more" @click.stop="toChanges(2)">
            <span>{{talk.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

        <ul class="my-singers" v-if="artist.artists">
          <li class="my-top">
           歌手
          </li>
          <li v-for="(item,index) in artist.artists" :key="index" @click.stop="toSinger(item.id)" class="li">
           <follow-base class="my-singers-base">
              <img v-lazy="item.img1v1Url" alt="" slot="left" class="img"> 
              <div slot="liRight" class="limit-singer">
               {{item.name}}
               <span class="li-right" v-if="item.alias.length">({{(item.alias[0])}})</span>
              </div>
              <div slot="rightFollow" class="right-share">
                <i class="iconfont iconwodeshoucang"></i>
                <span>已入驻</span>
              </div>
            </follow-base>
          </li>
           <li class="my-bottom" v-if="artist.more" @click.stop="toChanges(4)">
            <span>{{artist.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>

         <ul class="my-albums" v-if="album.albums">
            <li class="my-top">
            专辑
            </li>
            <li v-for="(item,index) in album.albums" :key="index" @click="toAlbum(item.id)" class="li">
              <album-base class="my-album">
                <div class="left-img" slot="left">
                  <img :src="item.picUrl" alt="">
                </div>
                <div slot="top" class="limit">
                <div class="limit-top-talks">{{item.name}}</div>
                </div>
                <div slot="bottom" class="limit">
                  <div class="limit-bottom-talks">
                    {{item.artist.name}}
                  {{Timestamp(item.publishTime)}}
                  </div>
                </div>
            </album-base>
            </li>
            <li class="my-bottom" v-if="album.more" @click.stop="toChanges(5)">
              <span>{{album.moreText}}</span>
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>

          <ul class="my-playlist" v-if="djRadio.djRadios">
            <li class="my-top">
            电台
            </li>
            <li v-for="(item,index) in djRadio.djRadios" :key="index" @click="selectItem(item.vid)">
              <list-base>
                <img v-lazy="item.picUrl" alt="" slot="left" class="img"> 
                <div slot="top" class="limit">
                <div class="limit-top-radio"> # {{item.name}}</div>
                </div>
                <div slot="bottom" class="limit">
                  <div class="limit-bottom-radio">{{item.dj.nickname}}</div>
                </div>
              </list-base>
            </li>
            <li class="my-bottom" v-if="djRadio.more"  @click.stop="toChanges(8)">
              <span>{{djRadio.moreText}}</span>
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>

          <ul class="my-users" v-if="user.users">
            <li class="my-top">
            用户
            </li>
            <li v-for="(item,index) in user.users" :key="index" @click.stop="toUser(item.userId, item.userType)" class="li">
              <follow-base class="my-users-base">
                <img v-lazy="item.avatarUrl" alt="" slot="left" class="img"> 
                <div slot="top" v-if="item.signature" class="limit">
                <div class="limit-top-user">{{item.nickname}}</div>
                <i class="iconfont iconnv" v-if="item.gender === 2"></i>
                <i class="iconfont iconnan" v-if="item.gender === 1"></i>
                </div>
                <div slot="bottom" v-if="item.signature" class="limit">
                <div class="limit-bottom-user"> {{item.signature}}</div>
                </div>
                <div slot="liRight" v-if="!item.signature" class="limit">
                  <div class="limit-top-user">{{item.nickname}}</div>
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
            <li class="my-bottom" v-if="user.more" @click.stop="toChanges(9)">
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
import baseAuto from '../../base/swiper/baseauto'
import songBase from '../../base/swiper/searchsong'
import subVideo from '../../base/swiper/subvideo'
import listBase from '../../base/swiper/listbase'
import logBase from '../../base/swiper/logbase'
import albumBase from '../../base/swiper/album'
import {timestamp} from '../../assets/js/timestamp'
import {serializeNumber} from '../../assets/js/number'
import {saveHistory, loadHistory, deleteAllHistory} from '../../common/js/goodstorage'


export default {
  inject: ['reload'],
  components: {
    followBase,
    songBase,
    subVideo,
    listBase,
    logBase,
    albumBase,
    baseAuto
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
      result:true,
      order:[],
      currentIndex:-1,
      allShow:false,
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
        if(res.data.result.order) {
          this.song = res.data.result.song || {}
          this.video = res.data.result.video || {}
          this.playList = res.data.result.playList || {}
          this.mlog = res.data.result.mlog || {}
          this.talk = res.data.result.talk || {}
          this.artist = res.data.result.artist || {}
          this.sim_query = res.data.result.sim_query || {}
          this.album = res.data.result.album || {}
          this.djRadio = res.data.result.djRadio || {}
          this.user = res.data.result.user || {}
          console.log(res.data)
        }else {
          setTimeout(() => {
            this.result =  false
          }, 3000)
        }
        this.order = res.data.result.order || []
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
    toCheckMusic(item,index) {
      this.currentIndex = index
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
    toChanges (i) {
      this.$emit('changeIndex',i)
    },
    toList (id) {
      this.$router.push({
        path:`/songlist/${id}`
      })
    },
    toSinger (id) {
      this.$api.singers.singermusic(id).then(res => {
        if(res.data.artist.accountId) {
          let userId = res.data.artist.accountId
          this.$router.push({
            path: `/singer/${userId}/${id}`
            })
        }else {
          let userId = 477726475
          this.$router.push({
            path: `/singer/${userId}/${id}`
          })
        }
      })
    },
    toAlbum (id) {
      this.$router.push({
        path:`/albumlist/${id}`
      })
    },
    toSearch(keyword) {
      this.reload()
      this.$router.push({
        path:`/search/${keyword}`
      }).catch(err => {
        console.log('输出报错',err)
      })

      this.toStore(keyword)
    },
    toStore(keyword) {
      saveHistory(keyword)
    },
    toMoreOpera (item) {
      this.$emit('more', item)
      console.log(item)
    }
  },
  created() {
    // this.getMultimatch (this.value)
    // this.getAlls(this.value, 60, 0, 1018)
  },
  mounted() {
    this.$nextTick(() => {
      this.getMultimatch (this.value)
      this.getAlls(this.value, 60, 0, 1018)
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:100%
    width:100%
    background-color:white
    margin-top:22px
    .scroll-list-wrap
      height:567px  
      position:absolute
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
          margin-bottom:10px
          img 
            height:50px
            width:50px
            border-radius:50%
          .my-follow-center-top
            max-width:235px
            ellipsis() 
        .my-inter-video
          margin-bottom:10px
          .my-video-wrap
            position:relative
            img 
              height:50px
              width:100px
              border-radius:5px
          .my-video-bg
             position:absolute   
             width:20px
             height:20px
             border-radius:50%
             background-color:rgba(255,255,255,.6)
             left:50%
             top:50%
             margin-top:-20px 
             margin-left:-7.5px
             flex-center()
             i  
               color:red
               font-size:$font-size-small
          .my-follow-center-top
            display:flex
            max-width:180px
            ellipsis()  
            .mv
              border:1px solid red
              height:15px
              width:30px
              border-radius:2px
              font-size:$font-size-small
              color:red
              flex-center()
              margin-top:2.5px
              margin-right:5px
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
          .iconlaba
            color:red
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
            .limit
              display:flex
              i
                margin-left:10px  
                font-size:$font-size-small

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

      .limit-singer
        max-width:220px
        ellipsis()  
      .limit  
        .limit-top
          max-width:280px
          ellipsis()  
        .limit-bottom
          max-width:285px
          ellipsis() 
        .limit-top-talks
          max-width:260px
          ellipsis()  
        .limit-bottom-talks
          max-width:265px
          ellipsis() 
        .limit-top-radio
          max-width:270px
          ellipsis()  
        .limit-bottom-radio
          max-width:270px
          ellipsis() 
        .limit-top-user
          max-width:190px
          ellipsis()  
        .limit-bottom-user
          max-width:200px
          ellipsis() 

        //上方加载中相关样式
  .pullloadtop
    width:100%
    height:30px
    // margin-top:150px
    position:relative
    top:150px
    z-index:1
    flex-center()
    .load
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray  
    .no-result
     color:gray  
     font-size:$font-size-medium 
</style>