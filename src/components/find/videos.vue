<template>
  <div>
    <div class="flex-div" >
      <div class="container" v-for="(item, index) in videos" :key="item.data.vid">
        <div class="wrap">
          <div class="wrap-top" @click="wonderfulVideo(index)">
            <div class="wrapper" :style="{backgroundImage:`url( ${item.data.coverUrl} )` }">
              <div class="wrapper-left">
                <i class="iconfont iconCell-PlayVolume"></i>
                <span>{{item.data.playTime}}</span>
              </div>
              <div class="wrapper-right">
                <i class="iconfont iconbofangzhuangtaizanting"></i>
                <span>{{item.data.durationms}}</span>
              </div>
            </div>

            <div class="title">
              <span>{{item.data.title}}</span>
              <img :src="item.data.creator.avatarUrl" @click="avatar()">
            </div>
          </div>

          <div class="wrap-bottom" @click="details(item.data.vid,index)">
            <div class="wrap-bottom-left" @click.stop="praisedCount(item, index)" ref="praise" :class="[item.data.praised === true ? redColor : '']">
              <i class="iconfont iconzan1"></i>
              <span ref="Count">{{item.data.praisedCount}}</span>
            </div>

            <div class="wrap-bottom-center">
              <i class="iconfont iconliuyan"></i>
              <span>{{item.data.commentCount}}</span>
            </div>

            <i class="wrap-bottom-right iconfont icon-ellipsis" @click="more()"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {serializeNumber} from '../../assets/js/number'
    import {durationsTransformation} from '../../assets/js/timestamp'

    export default {
      name: 'videos.vue',
      data () {
        return {
          videos: [],
          redColor: 'redColor'
        }
      },
      created () {
        this.getVideos()
      },
      computed: {
        ...mapGetters([
          'operation'
        ]),
        Operation () {
          return this.operation
        }
      },
      watch: {
        Operation (newOperation) {
          let index = this.videos.findIndex(item => {
            return item.data.vid === this.operation[0].id
          })
          if (newOperation[0].id === this.videos[index].data.vid) {
            if (newOperation[0].isPraised) {
              this.$refs.praise[index].classList.add('redColor')
              this.$refs.Count[index].innerHTML++
              console.log('详情加')
            } else {
              this.$refs.praise[index].classList.remove('redColor')
              this.$refs.Count[index].innerHTML--
              console.log('详情减')
            }
          }
        }
      },
      methods: {
        getVideos () {
          this.$api.video.videolist().then((res) => {
            this.videos = res.data.datas
            for (let i = 0; i < this.videos.length; i++) {
              this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
              this.videos[i].data.durationms = durationsTransformation(this.videos[i].data.durationms)
            }
          })
        },
        ...mapActions([
          'video',
          'commentBack',
          'saveCurrentVideoList',
          'saveOperationList'
        ]),
        // 上拉加载新数据
        upLoad () {

        },
        wonderfulVideo (index) {
          this.commentBack({back: false})
          this.video({
            videoGroupId: 9102
          })
          let currentVideo = this.videos[index].data
          currentVideo._currentTime = 0
          this.saveCurrentVideoList(currentVideo)
            // 去精彩视频页面并自动播放该视频
          this.$router.push({
            path: `videoslide`
          })
        },
        avatar () {
                // 去up主页
        },
        // //加载页面的时候默认操作
        // Operation() {
        //
        // },
        praisedCount (item, index) {
          let obj = {}
          obj.id = item.data.vid
          obj.isSubscribed = item.data.subscribed
          obj.followed = item.data.creator.followed
          let isPra = this.$refs.praise[index].className === 'wrap-bottom-left redColor'
          if (isPra) {
            this.$api.likes.isLike(0, 5, item.data.vid).then(res => {
              if (res.data.code === 200) {
                      // this.$refs.praise[index].classList.remove('redColor')
                      // this.$refs.Count[index].innerHTML--
                obj.isPraised = false

                this.saveOperationList(obj)

                      // saveOperation(obj)
                      // this.isPraiseing = false
              }
            })
          } else {
            this.$api.likes.isLike(1, 5, item.data.vid).then(res => {
              if (res.data.code === 200) {
                // this.$refs.praise[index].classList.add('redColor')
                // this.$refs.Count[index].innerHTML++
                obj.isPraised = true
                // saveOperation(obj)
                this.saveOperationList(obj)
                  // this.isPraiseing = true
              }
            })
          }
        },
        details (vid, index) {
                // 视频详情页，自动把底部评论提前
          this.$router.push({
            path: `videoplayer`
          })
            // 给vuex提交vid，确定当前要播放视频id
          this.video({vid})
          this.commentBack({back: true})
          let currentVideo = this.videos[index].data
          currentVideo._currentTime = 0
          this.saveCurrentVideoList(currentVideo)

          // let obj = {}
          // obj.id = item.data.vid
          // obj.isSubscribed = item.data.subscribed
          // obj.followed = item.data.creator.followed
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
  .flex-div
    width:100%
    margin-bottom:50px
    .container
      margin:5px 10px
      .wrap
        /*margin:10px*/
        .wrap-top
          background-color:#dcdcdc
          border-radius:5px
          .wrapper
            position:relative
            height:200px
            font-size:$font-size-small-s
            .wrapper-left
              position: absolute
              left:5px
              bottom:5px
              height:10px
            .wrapper-right
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
        .wrap-bottom
          height:35px
          line-height:35px
          font-size:$font-size-small-s
          position:relative
          flex-center(column)
          .wrap-bottom-left
            position:absolute
            left:0
            height:100%
            min-width:35px
          .wrap-bottom-center
            position:absolute
            left:100px
            height:100%
            min-width:35px
          .wrap-bottom-right
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

    .redColor
      color: red
</style>
