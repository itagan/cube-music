<template>
  <my-header class="header">
    <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
    <div slot="center" class="collect">我的收藏</div>
    <i class="iconfont iconnetease" slot="right" @click="music"></i>
  </my-header>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    export default {
      name: 'header.vue',
      components: {
        MyHeader
      },
      data () {
        return {
          isComplete: true
        }
      },
      methods: {
        toBack () {
          this.$router.go(-1)
        },
        music () {

        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .collect
    font-size:$font-size-large
  .music
    font-size:$font-size-large
</style>
