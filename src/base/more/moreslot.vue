<template>
  <div class="share">
    <cube-popup ref="popup" @mask-click="hide" :position="'bottom'" :zIndex="2001">
      <div class="share-build">
        <div class="top" v-if="$slots.top">
          <slot name="top"></slot>
        </div>
        <div class="center" v-if="$slots.center">
          <slot name="center"></slot>
        </div>
        <div class="bottom" v-if="$slots.bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    </cube-popup>
  </div>
</template>

<script>
    export default {
      name: 'playMore.vue',
      data () {
        return {
          options: {
            scrollbar: true
          }}
      },
      methods: {
        show () {
          this.$refs.popup.show()
        },
        hide () {
          this.$refs.popup.hide()
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
   .share-build
      position:relative
      bottom:0
      height:auto
      width:100%
      border-top-left-radius:20px
      border-top-right-radius:20px
      background-color:white
      .share-top
        height:30px
        width:100%
        padding-left:20px
        line-height:30px
        font-size:$font-size-small
      ul
        display:flex
        height:70px
        padding:15px 10px
        li
          height:70px
          width:70px
          text-align:center
          .share-icon
            border-radius:50%
            background-color:rgba(128,128,128,.2)
            height:50px
            width:50px
            font-size:$font-size-large-x
            margin-left:10px
            flex-center()
          .share-text
            padding-top:5px
            height:20px
            width:70px
            line-height:20px
            font-size:$font-size-small
      .share-center
        border-bottom:.5px solid rgba(128,128,128,.2)
      .button
        height:40px
        width:100%
        background-color:rgba(128,128,128,.1)
        text-align:center
        line-height:1
        font-size:$font-size-medium-x
        color:black

  .scroll-list-wrap
    width:375px
    .horizontal-scroll-list-wrap
      border-radius: 5px
      .cube-scroll-content
        display: inline-block
        width:auto
      ul
        padding: 15px 10px
        line-height: 70px
        white-space: nowrap
      li
        display: inline-block

  .cube-scroll-wrapper
    width:375px


</style>
