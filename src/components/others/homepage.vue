<template>
  <div class="home-page">
    <div class="home-page-message">
      <div class="home-page-message-base">基本信息</div>
      <div v-if="authentication">认证信息</div>
      <ul class="home-page-message-detail" @click.stop="moreMessage">
        <li>
          村龄：2年 （2019注册）
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
    <div class="home-page-music">
      <song-list-base>
        <div slot="left" class="home-page-music-rank">
          <i class="iconfont iconpaixingbang"></i>
        </div>
        <span slot="top">听歌排行</span>
        <span slot="bottom">累积听歌512首</span>
      </song-list-base>
      <song-list-base class="home-page-music-like">
          <div slot="left" class="home-page-music-like-heart">
            <i class="iconfont iconxin"></i>
          </div>
        <span slot="top">{{profile.nickname}} 喜欢的音乐</span>
        <span slot="bottom">{{trackCountLike}}首，播放{{playCountLike}}次</span>
      </song-list-base>
    </div>
    <ul class="home-page-song-list" v-if="this.playlist.length">
      <li class="home-page-song-list-create">创建的歌单
      <span>({{this.playlist.length}}个，被收藏112次)</span>
      </li>
      <li v-for="item in playlist.slice(1,4)" :key="item.id" class="home-page-song-list-li">
        <song-list-base>
          <img :src="item.coverImgUrl" alt="" slot="left" class="home-page-img">
          <span slot="top">{{item.name}}</span>
          <span slot="bottom">{{item.trackCount}}首，播放{{item.playCount}}次</span>
        </song-list-base>
      </li>
      <li class="home-page-song-list-more" v-if="this.playlist.length > 3">
        <span>更多歌单</span>
        <i class="iconfont iconleft-arrow"></i>
      </li>
    </ul>
    <ul class="home-page-song-list" v-if="this.collection.length">
      <li class="home-page-song-list-create">收藏的歌单
        <span>(12)</span>
      </li>
      <li class="home-page-song-list-li" v-for="item in collection.slice(0,3)" :key="item.id">
        <song-list-base>
          <img :src="item.coverImgUrl" alt="" slot="left" class="home-page-img">
          <span slot="top">{{item.name}}</span>
          <span slot="bottom">{{item.trackCount}}首，by {{item.creator.nickname}}，播放{{item.playCount}}次</span>
        </song-list-base>
      </li>
      <li class="home-page-song-list-more" v-if="this.collection.length > 3">
        <span>更多歌单</span>
        <i class="iconfont iconleft-arrow"></i>
      </li>
    </ul>
    
  </div>
</template>

<script>
    import songListBase from "../../base/song/songlistbase";
    export default {
        name: "homepage.vue",
        data() {
            return {
                authentication:false,
                playlist:[],
                collection:[],
                trackCountLike:0,
                playCountLike:0
            }
        },
        components: {
            songListBase
        },
        props: {
            profile:{
                type:Object,
                default:{}
            }
        },
        created () {
            this.getPlaylist()
        },
        methods: {
            getPlaylist () {
                this.$api.users.playlist(477726475).then(res => {
                    this.playlist = res.data.playlist.filter((item) => {
                        return item.subscribed === false
                    })
                    this.collection = res.data.playlist.filter((item) => {
                        return item.subscribed === true
                    })
                    this.trackCountLike = this.playlist[0].trackCount
                    this.playCountLike = this.playlist[0].playCount
                })
            },
            moreMessage () {
                this.$router.push({
                    path:'/basemessage'
                })
                console.log('11')
            }
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

  .home-page-img
    width:50px
    height:50px
    border-radius:5px

</style>
