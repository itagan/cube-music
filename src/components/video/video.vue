<template>
  <div>
    <video-header></video-header>
    <video-list :video-group-id="videogroupid"></video-list>
<!--    <cube-scroll-nav @change="changeHandler">-->
<!--      <cube-scroll-nav-panel-->
<!--        v-for="item in data"-->
<!--        :key="item.name"-->
<!--        :label="item.name">-->
<!--        <ul>-->
<!--          <li v-for="food in item.foods">-->
<!--            <div>-->
<!--              <img :src="food.icon">-->
<!--              <p>{{food.name}}</p>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </cube-scroll-nav-panel>-->
<!--    </cube-scroll-nav>-->
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
