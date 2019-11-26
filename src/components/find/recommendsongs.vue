<template>
  <div class="recommend">
    <div class="recommendTop">
      <span class="recommendLeft">推荐歌单</span>
      <router-link tab="div" class="recommendRight" to="/my">歌单广场</router-link>
    </div>
    <base-nav v-bind:result="result"></base-nav>
  </div>
</template>

<script>
  import BaseNav from '../../base/nav/nav'
  export default {
    name: 'recommendsongs.vue',
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
                  // console.log(this.result)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .recommend
    /*width:100%*/
    margin:0 10px
    margin-top:20px
    .recommendTop
      height:20px
      flex-between()
      .recommendLeft
        color:gray
        font-weight:bold
        font-size:$font-size-large
      .recommendRight
        color:gray
        font-size:$font-size-small
        line-height:20px
        height:20px
        width:60px
        text-align:center
        border-radius: 8px
        border:1px solid gray

</style>
