<template>
  <div class="li-item">
    <div class="li-left" v-if="$slots.left">
      <slot name="left"></slot>
      <div class="left-border"></div>
      <div class="left-cir"></div>
    </div>
    <div class="li-center">
      <div class="li-center-top" v-if="$slots.top">
        <slot name="top"></slot>
      </div>
      <div class="li-center-bottom" v-if="$slots.bottom">
        <slot name="bottom"></slot>
      </div>
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
    align-items: center
    height:65px
    width:100%
    margin-bottom:10px
    .li-left
      width:65px
      height:65px
      flex-center()
      margin-left:10px
      position:relative
      .left-border
        position:absolute
        border:.5px solid gray
        width:60px
        height:60px
        left:6px
        top:2px
        z-index:99
      .left-cir
        position:absolute
        border-radius:50%
        width:60px
        height:60px
        background-color:black
        z-index:98
        left:18px
    .li-center
      flex:1
      margin-left:20px
      height:65px
      .li-center-top
        font-size:$font-size-medium
        height:25px
        line-height:25px
        ellipsis()
        margin-top:12.5px
      .li-center-bottom
        font-size:$font-size-small
        height:20px
        line-height:20px
        ellipsis()
        display:flex
        color:gray  
</style>
