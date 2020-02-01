<template>
  <div class="recommend">
    <div class="recommend-top">
      <span class="recommend-left">推荐歌单</span>
      <router-link tab="div" class="recommend-right" to="/hotsearch">歌单广场</router-link>
    </div>
    <base-nav v-bind:result="result"></base-nav>
  </div>
</template>

<script>
  import BaseNav from '../../base/nav/nav'
  export default {
    name: 'recommendSongs.vue',
    components: {
      BaseNav
    },
    data () {
      return {
        result: []
      }
    },
    created () {
      this.getResults()
    },
    methods: {
      getResults () {
        this.$api.find.recommend().then((res) => {
          this.result = res.data.result
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .recommend
    margin:0 10px
    margin-top:20px
    .recommend-top
      height:20px
      flex-between()
      .recommend-left
        color:gray
        font-size:$font-size-large - 2
      .recommend-right
        color:gray
        font-size:$font-size-small
        line-height:20px
        height:20px
        width:60px
        text-align:center
        border-radius: 8px
        border:1px solid gray

</style>
