<template>
  <div class="li-item-min">
    <div class="li-left-img" v-if="$slots.leftImg">
      <slot name="leftImg"></slot>
    </div>
    <div class="li-left-music" v-if="$slots.leftMusic">
      <div class="li-left-music-bg">
        <i class="iconfont iconbofang6"></i> 
      </div>
      <slot name="leftMusic"></slot>
    </div>
    <div class="li-left-video" v-if="$slots.leftVideo">
      <div class="li-left-video-bg">
       <i class="iconfont iconbofang6"></i> 
      </div>
      <slot name="leftVideo"></slot>
    </div> 
    <div class="li-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .li-item-min
    display:flex
    height:30px
    line-height:30px
    width:100%
    margin:15px
    .li-left-img
      width:30px
      height:30px
      border-radius:5px
      img 
        height:100%
        width:100%
        border-radius:3px
    .li-left-music
      width:30px
      height:30px
      border-radius:5px
      position: relative 
      img 
        height:100%
        width:100%
        border-radius:3px
      .li-left-music-bg
        position:absolute
        height 15px
        width:15px
        border-radius:50%
        background-color:white
        opacity:0.7 
        left 50%
        top:50%
        margin-left:-7.5px
        margin-top:-7.5px
        flex-center()
        i 
         color:red
         font-size:$font-size-medium         

    .li-left-video
      width:50px
      height:30px
      border-radius:5px
      position: relative 
      flex-center()
      img 
        height:100%
        width:100%
        border-radius:3px
      .li-left-video-bg
        position:absolute
        height:10px
        width:10px
        flex-center()
       i
        color:white
        font-size:$font-size-large
    .li-right
      flex:1
      height:30px
      line-height:30px
      font-size:$font-size-small
      margin-left:10px
      color:gray
      
</style>