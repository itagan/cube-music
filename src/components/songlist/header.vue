<template>
  <my-header class="header">
    <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
    <div slot="center" class="song-list">{{title}}</div>
    <div  slot="right" class="song-img">
      <i class="iconfont icongengduo" @click="more"></i>
      <div @click="music" v-if="currentSong.al && currentSong.al.picUrl">
        <img :src="currentSong.al.picUrl" alt="" class="img" :class="cdCls">
      </div>
    </div>
  </my-header>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    import { mapGetters } from 'vuex'
    export default {
      name: 'header.vue',
      components: {
        MyHeader
      },
      data () {
        return {
          isComplete: true
        }
      },
      props: {
        title: {
          type: String,
          default: '歌单'
        }
      },
      computed: {
        ...mapGetters([
          'currentSong',
          'playing'
        ]),
        cdCls () {
          return this.playing ? 'play' : 'pause'
        }
      },
      methods: {
        toBack () {
          this.$router.go(-1)
        },
        more () {

        },
        music () {

        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .header
    font-size:$font-size-large
    background-color:transparent
    font-weight:bold
    .song-list
      overflow:hidden
    .song-img
      flex-center()
      i
        margin-right:20px
        font-size:$font-size-large-x
      div
        width:30px
        height:30px
        background-color:gray
        flex-center()
        border-radius:50%
        .img
          width:26px
          height:26px
          border-radius:50%
        .play
          animation: rotate 20s linear infinite
        .pause
          animation: rotate 20s linear infinite
          animation-play-state: paused

     @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)      
</style>
