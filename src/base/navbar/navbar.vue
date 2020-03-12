<template>
  <div class="min-nav-bar">
    <div class="mine-nav-bar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="mine-nav-bar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="mine-nav-bar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <h1 class="mine-nav-bar-title" v-if="title">
      <span class="mine-nav-bar-text" v-text="title"></span>
    </h1>
  </div>
</template>

<script>
    export default {
      name: 'navbar.vue',
      props: {
            // 考虑到头部可能会需要传入值
        title: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .min-nav-bar
    position: fixed
    top:0
    height: 50px
    width:100%
    z-index:999
    flex-center()
    background-color:rgb(245,245,245)
    .mine-nav-bar-left
      position: absolute
      left:0
      margin-left: 10px
    .mine-nav-bar-center
      flex: 1
      flex-center()
      margin: 0 50px
    .mine-nav-bar-right
      position: absolute
      right:0
      margin-right: 10px
    .mine-nav-bar-title
      position: absolute
      top: 0
      bottom: 0
      left: 20%
      right: 20%
      flex-center()
      text-align: center
    .mine-nav-bar-text
      width: 100%
      font-size: 18px
      line-height: 1.5
      ellipsis()

</style>
