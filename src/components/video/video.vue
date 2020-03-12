<template>
  <div class="video">
    <video-header></video-header>
    <slide @toggle="toggles" :groupid="videoGroupId"></slide>
  </div>
</template>

<script>
      import videoHeader from './header'
      import Slide from './slide'

      export default {
        name: 'video.vue',
        components: {
          videoHeader,
          Slide
        },
        data () {
          return {
            videoGroupId: ''
          }
        },
        created () {
          this.getGroupId()
        },
        methods: {
          getGroupId () {
            this.$api.video.videoGroupLists().then(res => {
              this.datas = res.data.data
              this.videoGroupId = this.datas[1].id
            })
          },
          toggles (id) {
                // 点击切换列表
            this.videoGroupId = id
          }
        }
      }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .video
    position:relative
    width:375px
    height:675px
    .my-nav
      width:375px
      height:42px
      position:fixed
      top:50px
      font-size:$font-size-small-s
      z-index:200

</style>
