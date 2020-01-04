<template>
  <div class="wrapper-base">
    <ul>
      <li class="li-top-left" v-if="$slots.topLeft">
        <slot name="topLeft"></slot>
      </li>
      <li class="li-top-center" v-if="$slots.topCenter">
        <slot name="topCenter"></slot>
      </li>
      <li class="li-top-right" v-if="$slots.topRight">
        <slot name="topRight"></slot>
      </li>
    </ul>
    <div class="base-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="base-bottom" v-if="$slots.bottom">
      <slot name="bottom"></slot>
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
  .wrapper-base
    height:auto
    width:100%
    ul
      height 20px
      line-height:20px
      width:100%
      display:flex
      position:relative
      li
        height 20px
        line-height:20px
      .li-top-left
        margin:auto 10px
        max-width:30px
      .li-top-center
        color:gray
        font-size:$font-size-small
        ellipsis()
        width:auto
        flex:1
      .li-top-right
         position:absolute
         right 10px
         width:20px 
    .base-center
      height:auto
      margin:10px
      font-size:$font-size-medium   

</style>