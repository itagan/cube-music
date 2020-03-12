<template>
  <div class="new-songs">
    <div class="new-songs-top">
      <div class="new-songs-left">
        <span class="new-left" @click="newLeft()">新碟</span>
        <span class="new-center"></span>
        <span class="new-right" @click="newRight()">新歌</span>
      </div>
      <router-link tab="div" class="new-songs-right" to="/newalbum" v-if="isShow">更多新碟</router-link>
      <router-link tab="div" class="new-songs-right" to="/newsong" v-if="show">新歌推荐</router-link>
    </div>

    <div class="nav-flex" v-show="isShow" v-if="albums.length">
      <div class="nav-item" v-for="item in albums" :key="item.id" @click="toAlbum(item.id)">
        <div class="nav-div">
          <img :src="item.picUrl" class="nav-img" alt="">
        </div>
        <div class="nav-title">{{item.name}}</div>
      </div>
    </div>

    <div class="nav-flex" v-show="show" v-if="result.length">
      <div class="nav-item" v-for="item in result" :key="item.id" @click="toMusic">
        <div class="nav-div">
          <img :src="item.picUrl" class="nav-img">
          <div class="nav-img-div" @click="player()"></div>
        </div>
        <div class="nav-title">{{item.name}}</div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'newSongs.vue',
      data () {
        return {
          isShow: true,
          show: false,
          result: [],
          albums: []
        }
      },
      created () {
        this.getResults()
        this.getTopAlbums()
      },
      methods: {
        getResults () {
          this.$api.find.recommend().then((res) => {
            this.result = res.data.result.slice(0, 3)
          })
        },
        getTopAlbums () {
          this.$api.albums.homenewalbum().then(res => {
            console.log(res.data)
            this.albums = res.data.albums.slice(0, 3)
          })
        },
        newLeft () {
          this.isShow = true
          this.show = false
        },
        newRight () {
          this.isShow = false
          this.show = true
        },
        player () {
                // 播放歌曲但不打开播放页面，阻止事件冒泡
                // e.preventDefault()
                // event.stopPropagation()
                // this.$router.push({path:`/my`})
        },
        toMusic () {},
        toAlbum (id) {
          this.$router.push({
            path: `/albumlist/${id}`
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .new-songs
    margin:0 10px
    margin-top:20px
    .new-songs-top
      height:20px
      flex-between()
      .new-songs-left
        font-weight:bold
        font-size:$font-size-large
        flex-between()
        .new-left
          /*float:left*/
        .new-center
          display:flex
          height:15px
          width:1px
          background-color:#dcdcdc
          margin:auto 5px
      .new-songs-right
        color:black
        font-size:$font-size-small
        line-height:20px
        height:20px
        width:60px
        text-align:center
        border-radius: 8px
        border:1px solid gray

  .nav-flex
    display:flex
    flex-wrap:wrap
    margin-top:15px
    flex-between()
    .nav-item
      width:30%
      height:130px
      flex:1
      max-width:30%
      min-width:30%
      margin-bottom:20px
      .nav-div
        position:relative
        width:110px
        height:110px
        .nav-img
          width:100%
          margin-bottom:100%
        .nav-img-div
          position:absolute
          bottom:3px
          right:3px
          color:white
          font-size:8px
          height:25px
          width:25px
          border-radius:50%
          background-color:#dcdcdc
          opacity:0.8
          display: flex
        .nav-img-div:after
          position: absolute
          left:9px
          top:9px
          margin-top:-3.5px
          content: ''
          width: 0
          height: 0
          border-left: 7px solid red
          border-right: 7px solid transparent
          border-bottom: 7px solid transparent
          border-top:7px solid transparent
      .nav-title
        color:gray
        font-size:$font-size-small
        multiline-ellipsis($num=2)
        width:110px
        wrap:break-words
        height:auto
        margin-top:5px
        line-height:1.2
</style>
