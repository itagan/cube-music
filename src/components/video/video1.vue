<template>
<!--  <div>-->
<!--    -->
<!--    <base-video></base-video>-->
<!--  </div>-->
  <ul>
    <li v-for="(item,index) in videos" :key="item.data.vid">
          <base-video :videos="videos" :item="item" :index="index"></base-video>
    </li>
  </ul>
</template>

<script>
  // 测试文件**** 新方案:分割基础组件baseVideo出去再从这里循环生成列表，解决一个bug（图标是否显示问题），但新产生一个bug（点击两下可能才播放暂停）。暂时未解决****

    import baseVideo from '../../base/video/basevideo'
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'
    export default {
      name: 'video1.vue',
      components: {
        baseVideo
      },
      data () {
        return {
          videos: [],
          item: {},
          index: -1
        }
      },
      created () {
        this.getVideos()
      },
      methods: {
        getVideos (id) {
          this.$api.video.videolist(id).then((res) => {
            this.videos = res.data.datas
            for (let i = 0; i < this.videos.length; i++) {
              this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
              this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)
            }
            console.log(this.videos)
          })
        }
      }
    }
</script>

<style scoped>

</style>
