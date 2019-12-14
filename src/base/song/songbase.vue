<template>
  <div class="song-base">
    <div class="num" v-show="!checkbox">
      <span v-show="!playing">11</span>
      <i class="iconfont iconlaba" v-show="playing"></i>
    </div>
    <div class="num" v-show="checkbox">
      <i class="iconfont iconshoucangchenggong"></i>
    </div>
    <div class="song-base-content">
      <div class="title" :class="[playing ? 'activeColor' : '']">
        <span class="title-left"></span>
        <span class="title-right"></span>
      </div>
      <div class="desc">
        <img src="" alt="" class="sq">
        <span class="nickname"></span>

        <span class="name"></span>
      </div>
    </div>

    <div class="playing" v-show="!checkbox">
      <i class="iconfont iconbofang5"></i>
    </div>
    <div class="more" v-show="!checkbox">
      <i class="iconfont icongengduo"></i>
    </div>

    <div v-show="checkbox" class="checkbox">
      <i class="iconfont icontuozhuai"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "songBase.vue",
        data () {
            return {
                playing:false,
                checkbox:false,
                activeColor:'activeColor'
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .song-base
    display:flex
    width:100%
    height:60px
    position:relative
    .num
      width: 50px
      height:60px
      flex-center()
      position:absolute
      left:10px
    .song-base-content
      margin-left:5px
      height:60px
      position:absolute
      left:60px
      width:auto
      .title
        font-size:$font-size-medium-x
        ellipsis()
        .title-right
          color:gray
      .desc
        font-size:$font-size-small
        color:gray
        ellipsis()
    .playing
      width: 60px
      height:60px
      flex-center()
      position:absolute
      right:60px
    .more
      width: 60px
      height:60px
      flex-center()
      position:absolute
      right:5px


  .activeColor
    color:red !important
</style>
