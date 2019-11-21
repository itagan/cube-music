<template>
  <div>
    <video-list :video-group-id="videogroupid"></video-list>
  </div>
</template>

<script>
    import videoList from "../common/videolist"
    export default {
        name: "video.vue",
        components: {
            videoList
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
