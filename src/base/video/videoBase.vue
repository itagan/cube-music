<!--<template>-->
<!--  <div class="flexdiv">-->
<!--    <div class="container" v-for="item in videos" :key="item.data.vid">-->
<!--      <div class="wrap">-->
<!--        <div class="wrapTop" @click="wonderfulVideo(item.data.vid)">-->
<!--          <div class="wrapper" :style="{backgroundImage:`url( ${item.data.coverUrl} )` }">-->
<!--            <div class="wrapperLeft">-->
<!--              <i class="iconfont iconzan1"></i>-->
<!--              <span>{{item.data.playTime}}</span>-->
<!--            </div>-->
<!--            <div class="wrapperRight">-->
<!--              <i class="iconfont iconzan1"></i>-->
<!--              <span>{{item.data.durationms}}</span>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="title">-->
<!--            <span>{{item.data.title}}</span>-->
<!--            <img :src="item.data.creator.avatarUrl" @click="avatar()">-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="wrapBottom" @click="details(item.data.vid)">-->
<!--          <div class="wrapBottomLeft" @click="praisedCount()">-->
<!--            <i class="iconfont iconzan1"></i>-->
<!--            <span>{{item.data.praisedCount}}</span>-->
<!--          </div>-->

<!--          <div class="wrapBottomCenter">-->
<!--            <i class="iconfont iconliuyan"></i>-->
<!--            <span>{{item.data.commentCount}}</span>-->
<!--          </div>-->

<!--          <i class="wrapBottomRight iconfont icon-ellipsis" @click="more()"></i>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    import {serializeNumber} from '../../assets/js/number'-->
<!--    import {durationms} from '../../assets/js/timestamp'-->


<!--    export default {-->
<!--        name: "videoBase.vue",-->
<!--        data() {-->
<!--            return {-->
<!--                videos:this.videos-->
<!--            }-->
<!--        },-->
<!--        props: {-->
<!--            videos:{-->
<!--                required:true-->
<!--            }-->
<!--        },-->
<!--        watch: {-->
<!--            videos(val) {-->
<!--                for(let i=0;i<val.length;i++){-->
<!--                    val[i].data.playTime = serializeNumber(val[i].data.playTime)-->
<!--                    val[i].data.durationms = durationms(val[i].data.durationms)-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods:{-->
<!--            wonderfulVideo(vid) {-->
<!--                //去精彩视频页面并自动播放该视频-->
<!--                // this.$router.push({-->
<!--                //     path:`videoplayer`-->
<!--                // })-->
<!--            },-->
<!--            avatar() {-->
<!--                //去up主页-->
<!--            },-->
<!--            praisedCount() {-->
<!--                //点赞-->
<!--            },-->
<!--            details(vid) {-->
<!--                //视频详情页，自动把底部评论提前-->
<!--                this.$router.push({-->
<!--                    path:`videoplayer`-->
<!--                });-->
<!--                //把视频详情id发给父组件-->
<!--                this.$emit('videoEmit',vid)-->
<!--            },-->
<!--            more() {-->
<!--                //更多-->
<!--            },-->
<!--        }-->

<!--    }-->
<!--</script>-->

<!--<style scoped lang="stylus" rel="stylesheet/stylus">-->
<!--  @import "../../common/stylus/variable"-->
<!--  @import "../../common/stylus/mixin"-->
<!--  .flexdiv-->
<!--    width:100%-->
<!--    margin-bottom:50px-->
<!--    .container-->
<!--      margin:5px 10px-->
<!--      .wrap-->
<!--        /*margin:10px*/-->
<!--        .wrapTop-->
<!--          background-color:#dcdcdc-->
<!--          border-radius:5px-->
<!--          .wrapper-->
<!--            position:relative-->
<!--            height:200px-->
<!--            font-size:$font-size-small-s-->
<!--            .wrapperLeft-->
<!--              position: absolute-->
<!--              left:5px-->
<!--              bottom:5px-->
<!--              height:10px-->
<!--            .wrapperRight-->
<!--              position: absolute-->
<!--              right:5px-->
<!--              bottom:5px-->
<!--              height:10px-->
<!--          .title-->
<!--            flex-between()-->
<!--            margin:auto 5px-->
<!--            height:35px-->
<!--            span-->
<!--              ellipsis()-->
<!--              font-size:$font-size-medium-x-->
<!--            img-->
<!--              width:20px-->
<!--              height:20px-->
<!--              border-radius:50%-->
<!--        .wrapBottom-->
<!--          height:35px-->
<!--          line-height:35px-->
<!--          font-size:$font-size-small-s-->
<!--          position:relative-->
<!--          flex-center(column)-->
<!--          .wrapBottomLeft-->
<!--            position:absolute-->
<!--            left:0-->
<!--            height:100%-->
<!--            min-width:35px-->
<!--          .wrapBottomCenter-->
<!--            position:absolute-->
<!--            left:100px-->
<!--            height:100%-->
<!--            min-width:35px-->
<!--          .wrapBottomRight-->
<!--            position:absolute-->
<!--            right:-10px-->
<!--            height:100%-->
<!--            width:35px-->
<!--            text-align:center-->

<!--        .wrapper:after-->
<!--          position: absolute-->
<!--          left:50%-->
<!--          top:50%-->
<!--          margin-top:-3.5px-->
<!--          content: ''-->
<!--          width: 0-->
<!--          height: 0-->
<!--          opacity:0.8-->
<!--          border-left: 17px solid gray-->
<!--          border-right: 17px solid transparent-->
<!--          border-bottom: 17px solid transparent-->
<!--          border-top:17px solid transparent-->
<!--</style>-->

<template>
  <div class="flexdiv">
    <div class="container">
      <div class="wrapper" @click="player">
        <video src="" class="video"></video>
        <div class="grop">22</div>
        <div class="wrapperLeft">
          <i class="iconfont iconzan1"></i>
          <span>11</span>
        </div>
        <div class="wrapperCenter" v-if="show">
          <i class="iconfont iconnetease"></i>
        </div>
        <div class="wrapperRight">
          <i class="iconfont iconzan1"></i>
          <span>22</span>
        </div>
        <div class="control">
          <div class="speed"></div>
          <div class="controlBtn"></div>
        </div>
      </div>

      <div class="title" @click="toPlayerDetail">
        <span>
          朴树之歌
        </span>
        <img src="" alt="">
      </div>

      <div class="wrapBottom" @click="toPlayerDetail">
        <div class="wrapBottomImg" @click="avatar()">
          <img>
          <span>谁</span>
        </div>

        <div class="wrapBottomLeft" @click="praisedCount()">
          <i class="iconfont iconzan1"></i>
          <span>1028</span>
        </div>

        <div class="wrapBottomCenter">
          <i class="iconfont iconliuyan"></i>
          <span>124</span>
        </div>

        <i class="wrapBottomRight iconfont icon-ellipsis" @click="more()"></i>
      </div>
    </div>
  </div>
</template>

<script>
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'

    export default {
      name: 'videoBase.vue',
      data () {
        return {
          videos: this.videos,
          show: true
        }
      },
      props: {
        videos: {
          type: Array,
          required: true
        }
      },
      watch: {
        videos (val) {
          for (let i = 0; i < val.length; i++) {
            val[i].data.playTime = serializeNumber(val[i].data.playTime)
            val[i].data.durationms = durationms(val[i].data.durationms)
          }
        }
      },
      methods: {
        player () {
                // if(this.show) {
                //     this.show = false
                // }
          this.show = !this.show
        },
        wonderfulVideo (vid) {
                // 去精彩视频页面并自动播放该视频
                // this.$router.push({
                //     path:`videoplayer`
                // })
        },
        toPlayerDetail () {

        },
        avatar () {
                // 去up主页
        },
        praisedCount () {
                // 点赞
        },
        details (vid) {
                // 视频详情页，自动把底部评论提前
          this.$router.push({
            path: `videoplayer`
          })
            // 把视频详情id发给父组件
          this.$emit('videoEmit', vid)
        },
        more () {
                // 更多
        }
      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
    .flexdiv
      width:100%
      background-color:white
      .container
        margin:5px 10px
        .wrapper
          background-color:#dcdcdc
          border-radius:10px
          position:relative
          height:203px
          font-size:$font-size-small-s
          .video
            width:100%
            height:200px
          .grop
            position:absolute
            top:10px
            right:10px
            border:1px solid gray
            min-width:25px
            text-align:center
            border-radius:6px
            height:13px
            line-height:13px
            padding:2px 8px
            background-color:greenyellow
          .wrapperLeft
            position: absolute
            left:5px
            bottom:10px
            height:10px
          .wrapperCenter
            position: absolute
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size:$font-size-large
          .wrapperRight
            position: absolute
            right:10px
            bottom:10px
            height:10px
          .control
            height:2px
            width:100%
            background-color:yellow
            position:absolute
            bottom:0
            .speed
              height:2px
              background-color:red
              width:auto
              margin:0 5px
            .controlBtn
              border-radius:50%
              background-color:red
              height:10px
              width:10px
              position:absolute
              bottom:-3px
              left:0


        .title
          border-bottom:1px solid #dcdcdc
          flex-between()
          margin:auto 5px
          height:45px
          span
            ellipsis()
            font-size:$font-size-medium
          img
            width:20px
            height:20px
            border-radius:50%
        .wrapBottom
          height:45px
          line-height:45px
          position:relative
          flex-center(column)
          font-size:$font-size-large
          .wrapBottomImg
            position:absolute
            left:0
            height:100%
            min-width:35px
            flex-center()
            img
              width:20px
              height:20px
              border-radius:50%
              margin-top:-15px
              position:absolute
              top:50%
            span
              ellipsis()
              height:35px
              line-height:35px
              margin-left:35px
              font-size:$font-size-small
          .wrapBottomLeft
            position:absolute
            left:210px
            height:100%
            min-width:35px
            span
              font-size:$font-size-small-s
              position:absolute
              bottom:8px
              left:13px

          .wrapBottomCenter
            position:absolute
            left:280px
            height:100%
            min-width:35px
            span
              font-size:$font-size-small-s
              position:absolute
              bottom:8px
              left:13px
          .wrapBottomRight
            position:absolute
            right:-10px
            height:100%
            width:35px
            text-align:center

</style>
