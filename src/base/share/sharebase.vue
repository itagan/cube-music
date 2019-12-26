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
  .li-item
    display:flex
    height:50px
    line-height:50px
    // width:290px
    // background-color:rgba(128,128,128,.2)
    width:100%
    border-radius:10px
    .li-left
      width:40px
      height:40px
      margin-left:5px
      border-radius:5px
      margin-top:5px
    .li-right
      flex:1
      margin-left:10px
      margin-top:10px
      height:50px
      line-height:50px
      max-width:235px
      .li-right-top
        font-size:$font-size-medium
        height:20px
        line-height:20px
        ellipsis()
      .li-right-bottom
        font-size:$font-size-small
        height:20px
        line-height:20px
        color:gray
        ellipsis()
</style>