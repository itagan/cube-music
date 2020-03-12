<template>
  <div class="li-item">
    <div class="li-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="li-center">
      <div class="li-center-top" v-if="$slots.top">
        <slot name="top"></slot>
      </div>
      <div class="li-center-bottom" v-if="$slots.bottom">
        <slot name="bottom"></slot>
      </div>
      <div class="li-center-only" v-if="$slots.liRight">
        <slot name="liRight"></slot>
      </div>
    </div>
    <div class="li-right-follow" v-if="$slots.rightFollow">
      <slot name="rightFollow"></slot>
    </div>
    <div class="li-right-share" v-if="$slots.rightShare">
      <slot name="rightShare"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .li-item
    display:flex
    height:65px
    line-height:65px
    width:100%
    border-radius:10px
    .li-left
      width:65px
      height:65px
      margin-left:10px
      border-radius:50%
    .li-center
      flex:1
      margin-left:10px
      height:65px
      // display:flex
      // align-items: center
      .li-center-top
        font-size:$font-size-medium
        height:25px
        line-height:25px
        ellipsis()
        margin-top:7.5px
      .li-center-bottom
        font-size:$font-size-small
        height:25px
        line-height:25px
        color:gray
        ellipsis()
      .li-center-only
        font-size:$font-size-medium
        height:65px
        // line-height:65px
        ellipsis()
        display:flex
        align-items: center
    .li-right-share
       width:30px
       height:65px
       margin-right:10px  
       font-size:$font-size-large-x + 6  
       flex-center()
    .li-right-follow
       height:65px
       margin-right:10px  
       font-size:$font-size-medium
       flex-center()
</style>
