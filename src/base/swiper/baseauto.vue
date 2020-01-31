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
    height:50px
    line-height:50px
    width:100%
    border-radius:10px
    .li-left
      width:auto
      height:50px
      margin-left:10px
    .li-center
      flex:1
      margin-left:10px
      height:50px
      .li-center-top
        font-size:$font-size-medium
        height:25px
        line-height:25px
        ellipsis()
      .li-center-bottom
        font-size:$font-size-small
        height:25px
        line-height:25px
        color:gray
        ellipsis()
      .li-center-only
        font-size:$font-size-medium
        height:50px
        ellipsis()
        display:flex
        align-items: center
    .li-right-share
       width:30px
       height:50px
       margin-right:10px  
       font-size:$font-size-large-x + 6  
       flex-center()
    .li-right-follow
       height:50px
       margin-right:10px  
       font-size:$font-size-medium
       flex-center()
</style>
