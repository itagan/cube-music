<template>
  <div>
    <video-base v-bind:videos="videos"></video-base>

  </div>
</template>

<script>
    import videoBase from "../../base/video/videoBase";
    export default {
        name: "videos.vue",
        components: {
            videoBase
        },
        data() {
            return {
                videos:[]
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
            }
        }
    }
</script>

<style scoped>

</style>
