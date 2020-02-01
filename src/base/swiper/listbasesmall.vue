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
    height:50px
    width:100%
    margin-bottom:10px
    .li-left
      width:50px
      height:50px
      flex-center()
      margin-left:10px
    .li-center
      flex:1
      margin-left:10px
      height:50px
      .li-center-top
        font-size:$font-size-medium
        height:20px
        line-height:20px
        ellipsis()
        margin-top:5px
      .li-center-bottom
        font-size:$font-size-small
        height:20px
        line-height:20px
        ellipsis()
        display:flex
        color:gray  
</style>
