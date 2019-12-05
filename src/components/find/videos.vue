<template>
  <div>
    <div class="flexdiv" >
      <div class="container" v-for="item in videos" :key="item.data.vid">
        <div class="wrap">
          <div class="wrapTop" @click="wonderfulVideo(item.data.vid)">
            <div class="wrapper" :style="{backgroundImage:`url( ${item.data.coverUrl} )` }">
              <div class="wrapperLeft">
                <i class="iconfont iconzan1"></i>
                <span>{{item.data.playTime}}</span>
              </div>
              <div class="wrapperRight">
                <i class="iconfont iconzan1"></i>
                <span>{{item.data.durationms}}</span>
              </div>
            </div>

            <div class="title">
              <span>{{item.data.title}}</span>
              <img :src="item.data.creator.avatarUrl" @click="avatar()">
            </div>
          </div>

          <div class="wrapBottom" @click="details(item.data.vid)">
            <div class="wrapBottomLeft" @click="praisedCount()">
              <i class="iconfont iconzan1"></i>
              <span>{{item.data.praisedCount}}</span>
            </div>

            <div class="wrapBottomCenter">
              <i class="iconfont iconliuyan"></i>
              <span>{{item.data.commentCount}}</span>
            </div>

            <i class="wrapBottomRight iconfont icon-ellipsis" @click="more()"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'

    export default {
      name: 'videos.vue',
      data () {
        return {
          videos: []
        }
      },
      created () {
        this.getVideos()
      },
      methods: {
        getVideos () {
          this.$api.video.videolist().then((res) => {
            this.videos = res.data.datas
            for (let i = 0; i < this.videos.length; i++) {
              this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
              this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)
            }
                    console.log(this.videos)
          })
        },
            // 这里代理actions，mapActions把它包装成类似函数调用的方式
        ...mapActions([
          'video',
          'commentBack'
        ]),

        //上拉加载新数据
        upLoad() {

        },
        wonderfulVideo () {
          this.commentBack({back: false})
          this.video({
              videoGroupId:9104
          });
            // 去精彩视频页面并自动播放该视频
            this.$router.push({
                path:`videoslide`
            })
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
            // 给vuex提交vid，确定当前要播放视频id
          this.video({vid})
          this.commentBack({back: true})
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
    margin-bottom:50px
    .container
      margin:5px 10px
      .wrap
        /*margin:10px*/
        .wrapTop
          background-color:#dcdcdc
          border-radius:5px
          .wrapper
            position:relative
            height:200px
            font-size:$font-size-small-s
            .wrapperLeft
              position: absolute
              left:5px
              bottom:5px
              height:10px
            .wrapperRight
              position: absolute
              right:5px
              bottom:5px
              height:10px
          .title
            flex-between()
            margin:auto 5px
            height:35px
            span
              ellipsis()
              font-size:$font-size-medium-x
            img
              width:20px
              height:20px
              border-radius:50%
        .wrapBottom
          height:35px
          line-height:35px
          font-size:$font-size-small-s
          position:relative
          flex-center(column)
          .wrapBottomLeft
            position:absolute
            left:0
            height:100%
            min-width:35px
          .wrapBottomCenter
            position:absolute
            left:100px
            height:100%
            min-width:35px
          .wrapBottomRight
            position:absolute
            right:-10px
            height:100%
            width:35px
            text-align:center

        .wrapper:after
          position: absolute
          left:50%
          top:50%
          margin-top:-3.5px
          content: ''
          width: 0
          height: 0
          opacity:0.8
          border-left: 17px solid gray
          border-right: 17px solid transparent
          border-bottom: 17px solid transparent
          border-top:17px solid transparent
</style>

