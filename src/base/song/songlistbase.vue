<template>
  <div class="li-item">
    <div class="li-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="li-right">
      <div class="li-right-top" v-if="$slots.top">
        <slot name="top"></slot>
      </div>
      <div class="li-right-bottom" v-if="$slots.bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'songListBase.vue'
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
    .li-left
      width:50px
      height:50px
      margin-left:10px
      border-radius:5px
      /*border:1px solid #dcdcdc*/
    .li-right
      flex:1
      margin-left:10px
      height:50px
      line-height:50px
      max-width:265px
      .li-right-top
        font-size:$font-size-medium
        height:25px
        line-height:25px
        ellipsis()
      .li-right-bottom
        font-size:$font-size-small
        height:20px
        line-height:20px
        color:gray
</style>
