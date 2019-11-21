<template>
  <div>
    <video-list :video-group-id="videogroupid"></video-list>
    <video-header></video-header>
  </div>
</template>

<script>
    import videoList from "../common/videolist"
    import videoHeader from "./header"
    export default {
        name: "video.vue",
        components: {
            videoList,
            videoHeader
        },
        data() {
           return {
               datas:[],
               videogroupid:9102
           }
        },
        created() {
          this.getGroupId()
        },
        methods: {
            getGroupId() {
                this.$api.video.videoGroupLists().then(res => {
                    this.datas = res.data.data;
                    this.videogroupid = this.datas[1].id;
                })
            }
        }
    }
</script>

<style scoped>

</style>
