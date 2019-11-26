<template>
  <more-Songs @cancel="cancel" class="mask">
    <span slot="top">我收藏的歌单{{nums}}</span>
    <div slot="main1" class="main" @click="manage">
      <i class="iconfont iconzan1"></i>
      <span>管理歌单</span>
    </div>
  </more-Songs>
</template>

<script>
    import moreSongs from '../common/moresongs'
export default {
      name: 'playmore.vue',
      components: {
        moreSongs
      },
      props: {
        nums: {
          type: Number,
          default: 0
        }
      },
      methods: {
        cancel () {
                // 触摸到遮罩层就取消本组件
          this.$emit('cancel')
        },
        manage () {
                // 管理歌单
                // 管理歌单  子提醒父组件再通知其他子组件
          this.$emit('manage')
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .main
    display:flex
    height:40px
    line-height:40px
    border-bottom:.5px solid rgba(128, 128, 128, 0.3)
    i
      margin-right:10px

</style>
