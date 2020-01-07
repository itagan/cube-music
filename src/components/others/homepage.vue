<template>
  <div class="home-page">
    <div class="home-page-message">
      <div class="home-page-message-base">基本信息</div>
      <div v-if="userMessage.profile && userMessage.profile.allAuthTypes" class="message-authentication">
        <ul>
          <li v-for="(item, index) in userMessage.profile.allAuthTypes" :key="index">
            <i class="iconfont iconQQkongjian"></i>
            <!-- <span>流行 | 华岳 | 欧美歌单达人</span> -->
            <span>
              {{item.desc}}
            </span>
          </li>
        </ul>
      </div>
      <ul class="home-page-message-detail" @click.stop="moreMessage">
        <li>
          村龄：{{createYear(userMessage.createDays)}} （{{registerTime(userMessage.createTime)}}注册）
        </li>
        <li>
          年龄：90后 天秤座
        </li>
        <li>
          地区：广东 广州
        </li>
      </ul>
      <div class="home-page-message-more" @click.stop="moreMessage">
        <span>更多信息</span>
        <i class="iconfont iconleft-arrow"></i>
      </div>
    </div>
    <div class="home-page-mlog" v-if="isLog">
        <div class="home-page-mlog-num">Mlog <span></span></div>
        <ul>
          <li>
            <img src="../user/img/login1.png" alt="">
            <div class="home-page-mlog-message">
              <div class="home-page-mlog-title">说唱机关枪转型滴滴滴滴滴滴</div>
              <span class="home-page-mlog-like">28赞</span>
            </div>
          </li>
          <li>
            <img src="../user/img/login1.png" alt="">
            <div class="home-page-mlog-message">
              <div class="home-page-mlog-title">说唱机关枪转型滴滴滴滴滴滴</div>
              <span class="home-page-mlog-like">28赞</span>
            </div>
          </li>
        </ul>
        <div class="home-page-mlog-more">
          <span>更多Mlog</span>
          <i class="iconfont iconleft-arrow"></i>
        </div>
    </div>
    <div class="home-page-music">
      <song-list-base>
        <div slot="left" class="home-page-music-rank">
          <i class="iconfont iconpaixingbang"></i>
        </div>
        <span slot="top">听歌排行</span>
        <span slot="bottom">累积听歌{{userMessage.listenSongs}}首</span>
      </song-list-base>
      
      <song-list-base class="home-page-music-like">
          <div slot="left" class="home-page-music-like-heart" @click="toListLike">
            <i class="iconfont iconxin"></i>
          </div>
        <span slot="top" v-if="userMessage.profile" @click="toListLike">{{userMessage.profile.nickname}} 喜欢的音乐</span>
        <span slot="bottom" @click="toListLike">{{trackCountLike}}首，播放{{playCountLike}}次</span>
      </song-list-base>
    </div>
     <ul class="home-page-song-list" v-if="musiccolumn">
      <li class="home-page-song-list-create">音乐专栏
      <span>(1个，被评论112次)</span>
      </li>
      <li class="home-page-song-list-li">
        <song-list-base>
          <img src="../user/img/login1.png" alt="" slot="left" class="home-page-img">
          <span slot="top">拿索斯古典音乐</span>
          <span slot="bottom">共80期，最近更新2019-12-30</span>
        </song-list-base>
      </li>
      <li class="home-page-song-list-more">
        <span>更多专栏</span>
        <i class="iconfont iconleft-arrow"></i>
      </li>
    </ul>
    <ul class="home-page-song-list" v-if="this.playlist.length">
      <li class="home-page-song-list-create">创建的歌单
      <span>({{this.playlist.slice(1).length}}个，被收藏112次)</span>
      </li>
      <li v-for="item in playlist.slice(1,4)" :key="item.id" class="home-page-song-list-li" @click.stop="toList(item.id)">
        <song-list-base>
          <img :src="item.coverImgUrl" alt="" slot="left" class="home-page-img">
          <span slot="top">{{item.name}}</span>
          <span slot="bottom">{{item.trackCount}}首，播放{{item.playCount}}次</span>
        </song-list-base>
      </li>
      <li class="home-page-song-list-more" v-if="this.playlist.length > 3" @click="moreList">
        <span>更多歌单</span>
        <i class="iconfont iconleft-arrow"></i>
      </li>
    </ul>
    <ul class="home-page-song-list" v-if="this.collection.length">
      <li class="home-page-song-list-create">收藏的歌单
        <span>({{collection.length}})</span>
      </li>
      <li class="home-page-song-list-li" v-for="item in collection.slice(0,3)" :key="item.id" @click.stop="toList(item.id)">
        <song-list-base>
          <img :src="item.coverImgUrl" alt="" slot="left" class="home-page-img">
          <span slot="top">{{item.name}}</span>
          <span slot="bottom" v-if="item.creator">{{item.trackCount}}首，by {{item.creator.nickname}}，播放{{item.playCount}}次</span>
        </song-list-base>
      </li>
      <li class="home-page-song-list-more" v-if="this.collection.length > 3" @click="moreList">
        <span>更多歌单</span>
        <i class="iconfont iconleft-arrow"></i>
      </li>
    </ul>
    
    <div class="home-page-comment" v-if="isComment">
      <div class="home-page-comment-who">TA的评论
        <span>11</span>
      </div>
      <ul class="home-page-comment-ul">
        <li class="li-top-left">
          <img src="../user/img/login1.png" alt="">
        </li>
        <li class="li-top-center">
          单曲 一曲肝肠断，何处匿知音
        </li>
        <li class="li-top-right">
          <span>111</span>
           <i class="iconfont iconzan1"></i>
        </li>
      </ul>
      <div class="home-page-comment-content">
        那些年吃西瓜的小女孩
      </div>
      <div class="home-page-comment-time">
        2019年1月1日
      </div>
       <div class="home-page-comment-more">
        <span>更多评论</span>
        <i class="iconfont iconleft-arrow"></i>
      </div>
     </div>
  </div>
</template>

<script>
    import songListBase from '../../base/song/songlistbase'
    import userBase from '../../base/basecomment/userbase'
    import { serializeNumber } from '../../assets/js/number'
    export default {
      name: 'homepage.vue',
      data () {
        return {
          playlists:[],
          playlist: [],
          collection: [],
          trackCountLike: 0,
          playCountLike: 0,
          isLog:false,
          musiccolumn:false,
          isComment:false
        }
      },
      components: {
        songListBase,
        userBase
      },
      props: {
        userMessage: {
          type: Object,
          default: {}
        }
      },
      created () {},
      watch:{
        userMessage (val) {
          //不采用created钩子，解决props传值未到达加载错误问题
          this.getPlaylist(val.profile.userId)
        }
      },
      methods: {
        getPlaylist () {
          this.$api.users.playlist(this.userMessage.profile.userId).then(res => {
            this.playlist = res.data.playlist.filter((item) => {
              return item.creator.userId === this.userMessage.profile.userId
            })
            this.collection = res.data.playlist.filter((item) => {
              return item.creator.userId !== this.userMessage.profile.userId
            })
            // console.log(res.data.playlist)
            this.trackCountLike = this.playlist[0].trackCount
            this.playCountLike = this.playlist[0].playCount
            for(let i = 0;i<res.data.playlist.length; i++) {
              res.data.playlist[i].playCount = serializeNumber(res.data.playlist[i].playCount)
            }
            this.playlists = res.data.playlist
            // console.log(this.playlists)

          })
        },
        moreMessage () {
          this.$router.push({
            // name:'Basemessage',
            path: `/basemessage`,
            // params:{
            //   profile:this.profile
            // }
            query: {
              profile:JSON.stringify(this.userMessage.profile),
              level:this.userMessage.level
            }
          })
        },
        moreList () {
          this.$router.push({
            path: `/moresonglist`,
            // params:{
            //   profile:this.profile
            // }
            query: {
              playlist:JSON.stringify(this.playlist),
              collection:JSON.stringify(this.collection)
            }
          })
        },
        toList (id) {
          this.$router.push({
            path:`/songlist/${id}`  //注意前面加个'/' 是根路由
          })
        },
        toListLike () {
          this.$router.push({
            path:`/songlist/${this.playlists[0].id}`  //注意前面加个'/' 是根路由
          })
        },
        createYear (day) {
          if(day < 365) {
            return `${day}` + '天'
          }else {
            return `${Math.floor(day / 365)}` + '年'
          }
        },
        registerTime (timestamp) {
          let date = new Date(timestamp)
          let Y = date.getFullYear() + '年'
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
          return Y + M 
        },

      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .home-page
    background-color:white
    padding-top:10px
    padding-bottom:50px
    .home-page-message
      height:auto
      width:100%
      margin:auto 10px
      .home-page-message-base
        height:30px
        line-height:30px
        font-size:$font-size-medium-x
      .message-authentication
        margin-bottom:5px
        color:gray
        font-size:$font-size-small
        ul
          height:auto
          // display:flex
          li
            height:25px
            line-height:25px
            i
              color:orange  
      .home-page-message-detail
        font-size:$font-size-small
        color:gray
        li
          height:20px
          line-height:20px
      .home-page-message-more
        height:40px
        line-height:40px
        font-size:$font-size-medium
        color:gray
        text-align:center
    .home-page-mlog
      .home-page-mlog-num
        height:30px
        line-height:30px
        font-size:$font-size-medium-x
        margin-left:10px
        span 
          font-size:$font-size-small
          color:gray
      ul
        flex-between()
        margin:10px
        li
          height:220px
          width:172.5px
          position:relative 
          border-radius:10px
          img 
            width:100%
            height 100%
            border-radius:10px
          .home-page-mlog-message
            position:absolute
            bottom 10px
            margin:auto 10px
            width:153px
            height:30px
            .home-page-mlog-title
              font-size: $font-size-medium
              color:white
              ellipsis()
              width:153px
              height 20px
              line-height:20px
            .home-page-mlog-like
              font-size: $font-size-small
              color:gray
      .home-page-mlog-more        
        height:40px
        line-height:40px
        font-size:$font-size-medium
        color:gray
        text-align:center
    .home-page-music
      height:auto
      .home-page-music-like
        margin:10px auto
      .home-page-music-rank
        background-color:indianred
        flex-center()
        border-radius:5px
        i
          font-size:$font-size-large-x
          color:white
      .home-page-music-like-heart
        background-color:silver
        flex-center()
        border-radius:5px
        i
          font-size:$font-size-large-x
          color:red
    .home-page-song-list
      height:auto
      margin-top:10px
      .home-page-song-list-li
        margin-top:5px
      .home-page-song-list-create
        height:40px
        line-height:40px
        margin-left:10px
        span
         color:gray
         font-size:$font-size-small
      .home-page-song-list-more
        height:40px
        line-height:40px
        font-size:$font-size-medium
        color:gray
        text-align:center
    .home-page-comment
      .home-page-comment-who
        height:30px
        line-height:30px
        font-size:$font-size-medium-x
        margin-left:10px
        span 
          color:gray
          font-size:$font-size-small
      .home-page-comment-ul 
        height 20px
        line-height:20px
        width:100%
        display:flex
        position:relative
        margin:10px auto
        li
          height 20px
          line-height:20px
          color:gray
        .li-top-left
          margin:auto 10px
          max-width:30px
          img 
            height 20px
            width:20px
        .li-top-center
          font-size:$font-size-small
          ellipsis()
          width:auto
          flex:1
        .li-top-right
          position:absolute
          right:10px
          width:20px  
          margin-right:10px 
      .home-page-comment-content
        height:auto
        margin:10px
        font-size:$font-size-medium   
      .home-page-comment-time
        font-size:$font-size-small  
        color:gray
        margin:auto 10px
      .home-page-comment-more
        height:40px
        line-height:40px
        font-size:$font-size-medium
        color:gray
        text-align:center
  .home-page-img
    width:50px
    height:50px
    border-radius:5px

</style>
