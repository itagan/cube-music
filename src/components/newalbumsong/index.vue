<template>
  <div class="wrapper">
     <my-header class="header">
      <div slot="left" @click="toBack" class="left">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div slot="center" class="new">
          <div class="new-song" @click="toSong"> 
            <span>新歌</span>
          </div>
          <div class="new-album" @click="toAlbum">
            <span>新碟</span>
          </div>


           <!-- <cube-slide
            :data="objs"
            :initialIndex="currentPage"
            :loop="false"
            :autoPlay="false"
            :threshold="0.1"
            :showDots = 'false'
            @change="slideChange">
            <cube-slide-item :index="0">
              <div class=" active" @click="toSong"> 
              </div>
            </cube-slide-item>

            <cube-slide-item :index="1">
              <div class=" active1" @click="toAlbum">
              </div>
            </cube-slide-item>
          </cube-slide> -->

      </div>
      <div  slot="right" class="music">
        <i class="iconfont iconbofangzhuangtaizanting" @click="music"></i>
      </div>
    </my-header>

    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
export default {
  components: {
    MyHeader
  },
  props: {},
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    toBack () {
      this.$router.go(-1)
    },
    music () {
    },
    toSong () {
      this.$router.push({
        path:'newsong'
      })
    },
    toAlbum () {
      this.$router.push({
        path:'newalbum'
      })
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
    .header
      .new
        display:flex
        width:130px
        height:25px
        border:1px solid red
        color:red
        border-radius:15px
        font-size:$font-size-large
        // position: relative
        .new-song
          width:65px
          flex-center()
          border-radius:15px

        .new-album
          width:65px
          flex-center()
          border-radius:15px



    .cube-slide
      .cube-slide-group  
        width:130px !important
        .cube-slide-item
          width:65px



    .active
      // background-color:red
      // color:white
      width:66px
      height:25px
      border-radius:15px
    .active1
      background-color:red
      color:white
      width:66px
      height:25px 
      border-radius:15px 
          
</style>