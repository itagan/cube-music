<template>
  <div class="video">
    <video-header></video-header>
<!--    <video-nav class="my-nav" @toggle="toggles"></video-nav>-->
<!--&lt;!&ndash;    <video-list :video-group-id="videogroupid" class="videolist"></video-list>&ndash;&gt;-->
<!--    <video-one class="videolist" :groupid="videogroupid"></video-one>-->
<slide @toggle="toggles" :groupid="videogroupid"></slide>

  </div>
</template>

<script>
      import videoHeader from './header'
      import videoNav from "./videonav"
      import videoList from '../common/videolist'
      import videoOne from "./videoone"
      import Slide from "./slide"

      export default {
        name: 'video.vue',
        components: {
          videoList,
          videoHeader,
            videoNav,
            videoOne,
            Slide
        },
        data () {
          return {
              datas: [],
              videogroupid:'',
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
                this.videogroupid = id;
                console.log(this.videogroupid)

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
    .videolist
      position:absolute
      top:100px
      /*height:667px*/
      /*width:375px*/

</style>
