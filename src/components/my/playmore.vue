<template>
  <more-songs @cancel="cancel" class="mask">
    <span slot="top">我创建的歌单{{num}}</span>
    <div slot="main1" class="main" @click.stop="build">
      <i class="iconfont iconxinjian"></i>
      <span>新建歌单</span>
    </div>
    <div slot="main2" class="main" @click.stop="manage">
      <i class="iconfont iconguanli"></i>
      <span>管理歌单</span>
    </div>
    <div slot="main3" class="main">
      <i class="iconfont icondaoru"></i>
      <span>导入外部歌单</span>
    </div>
    <div slot="main4" class="main">
      <i class="iconfont iconhuifu1"></i>
      <span>恢复歌单</span>
    </div>
  </more-songs>
</template>

<script>
    import moreSongs from '../common/moresongs'
export default {
      name: 'playMore.vue',
      components: {
        moreSongs
      },
      props: {
        num: {
          type: Number,
          default: 0
        }
      },
      methods: {
        cancel () {
                // 触摸到遮罩层就取消本组件
          this.$emit('cancel')
        },
        show () {
          this.visible = true
        },
        hide () {
          this.visible = false
        },
        build () {
                // 告诉父组件创建新歌单
          this.$emit('build')
            // 并取消自己
        },
        manage () {
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
        font-size:$font-size-medium-x

</style>
