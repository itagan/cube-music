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
    import baseVideo from '../../base/video/basevideo'
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'
    export default {
        name: "my.vue",
        components: {
            baseVideo
        },
        data() {
            return {
                videos:[],
                item:{},
                index:-1
            }
        },
        created() {
            this.getVideos();
        },
        methods: {
            getVideos(id) {
                this.$api.video.videolist(id).then((res) => {
                    this.videos = res.data.datas;
                    for(let i=0;i<this.videos.length;i++){
                        this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
                        this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)
                    }
                    console.log(this.videos)
                })
            },
        }
    }
</script>

<style scoped>

</style>
