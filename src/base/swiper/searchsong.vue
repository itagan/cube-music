<template>
  <div class="li-item">
    <div class="li-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="li-center">
      <div class="li-center-top" v-if="$slots.top">
        <slot name="top"></slot>
      </div>
      <div class="li-center-center" v-if="$slots.center">
        <slot name="center"></slot>
      </div>
      <div class="li-center-bottom" v-if="$slots.bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
    <div class="li-right-play" v-if="$slots.rightPlay">
      <slot name="rightPlay"></slot>
    </div>
    <div class="li-right-more" v-if="$slots.rightMore">
      <slot name="rightMore"></slot>
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
    // flex-direction:column
    height:auto
    width:100%
    .li-left
      width:30px
      height:100%
      flex-center()
      margin-left:10px
      i
       font-size:$font-size-large
    .li-center
      flex:1
      margin-left:10px
      min-height:50px
      .li-center-top
        font-size:$font-size-medium
        height:25px
        line-height:25px
        ellipsis()
      .li-center-center
        font-size:$font-size-small
        height:20px
        line-height:20px
        color:gray
        ellipsis()
      .li-center-bottom
        font-size:$font-size-small
        height:20px
        line-height:20px
        ellipsis()
        display:flex
        color:gray
    .li-right-more
       width:30px
       height:100%
       margin-right:10px  
       font-size:$font-size-large-x + 6  
       flex-center()
    .li-right-play
       height:100%
       margin-right:10px  
       font-size:$font-size-medium

    i
     font-size:$font-size-large   
</style>
