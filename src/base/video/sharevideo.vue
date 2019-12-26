<template>
  <div class="wrapper">
    <div class="wrapper-bottom" v-if="$slots.wrapBottom">
      <slot name="wrapBottom"></slot>
    </div>
    <div class="wrapper-center">
      <i class="iconfont iconbofang6"></i>
    </div>
    <div class="wrapper-left">
      <i class="iconfont iconCell-PlayVolume"></i>
      <div v-if="$slots.wrapLeft">
        <slot name="wrapLeft"></slot>
      </div>
    </div>
    <div class="wrapper-right">
      <i class="iconfont iconbofangzhuangtaizanting"></i>
      <div v-if="$slots.wrapRight">
        <slot name="wrapRight"></slot>
      </div>
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

  .wrapper
    width:100%
    height:100%
    position: relative
    .wrapper-bottom
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
    .wrapper-center
      position:absolute
      left:50%
      top:50%
      margin-left:-22.5px
      margin-top:-22.5px
      z-index:1
      color:white
      i 
       font-size:45px
    .wrapper-left
      position:absolute
      left:5px
      bottom:5px
      z-index:1 
      display:flex
      font-size:$font-size-small
      color:white
      height 15px
      width:auto
      line-height:15px
    .wrapper-right
      position:absolute
      right:5px
      bottom:5px
      z-index:1      
      display:flex
      font-size:$font-size-small
      color:white
      height 15px
      width:auto
      line-height:15px
</style>