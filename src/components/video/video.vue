<template>
  <div class="video">
    <video-header></video-header>
    <video-nav class="my-nav" @toggle="toggles"></video-nav>
<!--    <video-list :video-group-id="videogroupid" class="videolist"></video-list>-->
    <video-one class="videolist" :groupid="videogroupid"></video-one>


  </div>
</template>

<script>
      import videoHeader from './header'
      import videoNav from "./videonav"
      import videoList from '../common/videolist'
      import videoOne from "./videoone";

      export default {
        name: 'video.vue',
        components: {
          videoList,
          videoHeader,
            videoNav,
            videoOne,
        },
        data () {
          return {
              datas: [],
              videogroupid: 9102,
          }
        },
        created () {
          this.getGroupId()
        },
        methods: {
          getGroupId () {
            this.$api.video.videoGroupLists().then(res => {
              this.datas = res.data.data
              this.videogroupid = this.datas[1].id
            })
          },
            toggles(id) {
                //点击切换列表
                console.log(id)
                this.videogroupid = id;
            }
        }
      }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .video
    position:relative
    .my-nav
      width:375px
      height:42px
      position:fixed
      top:50px
      font-size:$font-size-small-s
      z-index:200
    .videolist
      position:absolute
      top:100px
      /*height:667px*/
      /*width:375px*/

</style>
