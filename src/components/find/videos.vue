<template>
  <div>
    <video-base v-bind:videos="videos" @videoEmit="videoemit"></video-base>

  </div>
</template>

<script>
    import videoBase from "../../base/video/videoBase";
    import {mapActions} from 'vuex'

    export default {
        name: "videos.vue",
        components: {
            videoBase
        },
        data() {
            return {
                videos:[],
            }
        },
        created() {
            this.getVideos()
        },
        methods: {
            getVideos() {
              this.$api.video.videolist().then((res) => {
                this.videos = res.data.datas;
                  console.log(this.videos)
              })
            },
            //接收子组件传来的数据
            videoemit(vid) {
                this.video({vid});
            },
            //这里代理actions，mapActions把它包装成类似函数调用的方式
            ...mapActions([
                'video'
            ])
        }
    }
</script>

<style scoped>

</style>
