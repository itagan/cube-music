<template>
  <div class=wonderful>

    <nav-bar class="wonderful-header">
      <i class="iconfont iconlive" slot="left" @click="goback"></i>
      <div slot="center" class="music">精彩视频</div>
    </nav-bar>


    <div class="content-scroll-wrapper" ref="navs" @touchend="btnTouchEnd"
    >
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @scroll-end="scrollEnd"
        @touch-end="ontouchend"
        @pulling-up="onPullingUp">
        <ul>
          <li v-for="(item,index) in videos" :key="item.data.vid">
            <wonderful-base
              :videos="videos"
              :item="item"
              :index="index"
              :pullDownY="pullDownY"
              :der="der"
              @refresh="refreshfinish"
              @rollback="rollBack"
            ></wonderful-base>
          </li>
        </ul>

        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="pullload">
            <template>
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 加载中...</span>
                </span>
              <!--              <span v-else>更新成功</span>-->
            </template>
          </div>
        </template>

      </cube-scroll>
    </div>
  </div>
</template>

<script>
    import navBar from '../../base/navbar/navbar'
    import wonderfulBase from '../../base/video/wonderfulbase'
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'
    export default {
      components: {
        navBar,
        wonderfulBase
      },
      data () {
        return {
          videos: [],
          item: {},
          index: -1,
          options: {
            pullUpLoad: true,
            probeType: 1,
            click: false // 解决点击事件被触发两次的问题
          },
          secondStop: 0,
          scrollEvents: ['scroll', 'scroll-end'],
          pullDownY: 0,
          der: 0

        }
      },

      created () {
        this.getVideos()
      },
        // watch:{
        //     groupid() {
        //         this.getVideos();
        //     }
        // },
      methods: {
        getVideos () {
          this.$api.video.videolist(9102).then((res) => {
            this.videos = res.data.datas
            for (let i = 0; i < this.videos.length; i++) {
              this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
                        // console.log(this.videos[i].data.playTime);
              this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)
            }
                    // console.log(this.videos)
          })
        },
        goback () {

        },
        rollBack (top) {
                // 点击下边的视频即往上滚动并播放。
          this.$refs.contentScroll.scroll.scrollBy(0, -312.5, 300)
        },

            // onPullingDown() {
            //     setTimeout(() => {
            //         // this.getVideos();
            //         this.videos = this.videos.reverse();
            //         this.$refs.contentScroll.scrollTo(0, this.secondStop, 300);
            //         // this.$refs.contentScroll.forceUpdate();//下拉完毕
            //     }, 1000);
            // },

        onPullingUp () {
          setTimeout(() => {
            if (this.isPullUpLoad) {
              this.videos = [] // 清空数据，以防重复渲染
            };
            this.getVideos()
            const contentScroll = this.$refs.contentScroll
            contentScroll.forceUpdate()
                // contentScroll.refresh();
          }, 1000)
        },

        refreshfinish () {
          const contentScroll = this.$refs.contentScroll
          contentScroll.scroll.beforePullDown && contentScroll.refresh()
          contentScroll.forceUpdate()
        },
        scrollHandler (pos) {
          this.pullDownY = -pos.y
            // console.log(this.pullDownY)

          if (this.pullDownY) {
                    // 上滑
                    // console.log('上滑')

                    // let der = this.$refs.contentScroll.scroll.movingDirectionY;
                    // //
                    // console.log( der )

            this.$refs.contentScroll.scroll.on('touchend', (pos) => {
              console.log(pos)
            })

            if (this.pullDownY > 100) {
                        // 滑到上上一个播放。
                        // const contentScroll = this.$refs.contentScroll
                        // contentScroll.scroll.wheelTo(5);
                        // this.$refs.contentScroll.scrollToElement('.wonderful-header', 200, 0, 0);
                        // this.$refs.contentScroll.scrollTo(0,50,300);
                        // this.rollBack();

                        // this.$refs.contentScroll.scroll.prev(300)
                        // let der = this.$refs.contentScroll.scroll.movingDirectionY;
                        // //
                        // console.log( der )

                        // this.$refs.contentScroll.scroll.scrollBy(0,-200,300);

                            // this.$refs.contentScroll.scroll.movingDirectionY

            }
          } else {
                    // 下滑
                    // console.log('下滑')

          }
        },
        scrollEnd (pos) {
                // let der = this.$refs.contentScroll.scroll.movingDirectionY;
                //
                // console.log( der )
                // if(der === -1) {
                //     // //上到下
                //     this.$refs.contentScroll.scroll.scrollBy(0,200,300);
                //     // this.$refs.contentScroll.refresh()
                // }

        },
        ontouchend (e) {
                // let der = this.$refs.contentScroll.scroll.movingDirectionY;
                // console.log(e)
        },
        btnTouchEnd () {
                // console.log( e);
          this.der = this.$refs.contentScroll.scroll.movingDirectionY
          console.log(this.der)

          if (this.der === -1) {
                    // //上到下
            this.$nextTick(() => {
              this.$refs.contentScroll.scroll.scrollBy(0, -312, 10)
            })
                    // this.$refs.contentScroll.scroll.scrollBy(0,312,10);
                    // this.$refs.contentScroll.scrollTo(0, 100, 300);
          } else if (this.der === 1) {
                    // this.$refs.contentScroll.scroll.scrollBy(0,-312,10);
            this.$nextTick(() => {
              this.$refs.contentScroll.scroll.scrollBy(0, 312, 10)
            })
                    // this.$refs.contentScroll.scrollTo(0, -100, 300);
          } else {
            return
          }
                // this.$refs.contentScroll.scroll.wheelTo(3)
          console.log(this.$refs.contentScroll.scroll.getCurrentPage())
          this.$refs.contentScroll.refresh()
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wonderful
    height:667px
    widows:375px
    background-color:black
    position:relative
    z-index:2001
    .wonderful-header
      height:50px
      width:375px
      background-color:black
      color:white
      font-size:$font-size-medium-x
      position:absolute
      z-index:2003
      top:0
      /*margin-top:50px*/

  .content-scroll-wrapper
    position:absolute
    height:667px
    width:375px
    top:50px
    z-index:2002
    background-color:black

  //加载中相关样式
  .pullload
    width:100%
    height:30px
    margin-top:1px
    background-color:black
    position:relative
    top:0
    bottom:50px
    flex-center()
    .load
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray
        font-size:$font-size-medium


    .bounce-enter-active
      animation: bounce-in .5s;

    .bounce-leave-active
      animation: bounce-in .5s reverse;

    @keyframes bounce-in
      0% {
        transform: translateX(0px);
      }
      50% {
        transform: translateX(50px);
      }
      100% {
        transform: translateX(0px);
      }




  .cube-scroll-content
    height:auto
</style>
