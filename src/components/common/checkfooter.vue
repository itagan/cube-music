<template>
  <div class="wrapper">
    <ul class="check-footer">
      <li @click.stop="toNext">
        <div class="check-footer-icon"><i class="iconfont iconbofang" :style="[addColor === true ? {color:'black'} : {color:'gray'}]"></i></div>
        <div class="check-footer-text">下一首播放</div>
      </li>
      <li @click.stop="toCollect">
        <div class="check-footer-icon"><i class="iconfont iconwodeshoucang" :style="[addColor === true ? {color:'black'} : {color:'gray'}]"></i></div>
        <div class="check-footer-text">收藏到歌单</div>
      </li>
      <li @click.stop="toLoad"> 
        <div class="check-footer-icon"><i class="iconfont iconxiazaigequ" :style="[addColor === true ? {color:'black'} : {color:'gray'}]"></i></div>
        <div class="check-footer-text">下载</div>
      </li>
      <li @click.stop="noLoad">
        <div class="check-footer-icon"><i class="iconfont iconquxiao" :style="[addColor === true ? {color:'black'} : {color:'gray'}]"></i></div>
        <div class="check-footer-text">删除下载</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    addColor: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    toNext () {},
    toCollect () {
      this.$emit('collect')
    },
    toLoad () {},
    noLoad () {}
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    .check-footer
      position:absolute
      bottom:0
      z-index:2003
      height:50px
      width:375px
      display:flex
      font-size:$font-size-small
      color:dimgray
      li
        width:25%
        flex:1
        background-color:#dcdcdc
        height:50px
        text-align:center
        .check-footer-icon
          height:30px
          line-height:30px
          i
            font-size:$font-size-large-x
        .check-footer-text
          height:20px
          line-height:1.5
</style>