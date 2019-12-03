<!--<template>-->
<!--  <div class=wonderful>-->

<!--    <nav-bar class="wonderful-header">-->
<!--      <i class="iconfont iconlive" slot="left" @click="goback"></i>-->
<!--      <div slot="center" class="music">精彩视频</div>-->
<!--    </nav-bar>-->

<!--    <div class="slides">-->

<!--      <cube-slide-->
<!--        ref="slide"-->
<!--        :data="videos"-->
<!--        direction="vertical"-->
<!--        :showDots="false"-->
<!--        :autoPlay="false"-->
<!--        :loop="false"-->
<!--        :options="options"-->
<!--        @change="changePage"-->
<!--        class="cube-slide">-->
<!--        <cube-slide-item v-for="(item, index) in videos" :key="index"  class="slide-item">-->

<!--          <wonderful-base-->
<!--            :videos="videos"-->
<!--            :item="item"-->
<!--            :index="index"-->
<!--            :ind="ind"-->
<!--            :pullDownY="pullDownY"-->
<!--            @rollback="rollBack"-->
<!--            class="base"-->
<!--            ref="base"-->
<!--          >-->
<!--          </wonderful-base>-->

<!--        </cube-slide-item>-->
<!--      </cube-slide>-->


<!--&lt;!&ndash;      <div v-if="pullLoad" class="pullload">&ndash;&gt;-->
<!--&lt;!&ndash;         <span class="load">&ndash;&gt;-->
<!--&lt;!&ndash;           <i class="iconfont iconyinletiaodongzhuangtai"></i>&ndash;&gt;-->
<!--&lt;!&ndash;           <span> 加载中...</span>&ndash;&gt;-->
<!--&lt;!&ndash;         </span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->

<!--    </div>-->


<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    import {mapActions, mapGetters, mapMutations} from 'vuex'-->
<!--    import navBar from "../../base/navbar/navbar"-->
<!--    import wonderfulBase from "../../base/video/wonderfulbase"-->
<!--    import {serializeNumber} from '../../assets/js/number'-->
<!--    import {durationms} from '../../assets/js/timestamp'-->
<!--    export default {-->
<!--        components: {-->
<!--            navBar,-->
<!--            wonderfulBase-->
<!--        },-->
<!--        data () {-->
<!--            return {-->
<!--                videos: [],-->
<!--                item: {},-->
<!--                index: 0,-->
<!--                options: {-->
<!--                    pullUpLoad: true,-->
<!--                    probeType:1,-->
<!--                    momentum: false,-->
<!--                    click: true,-->
<!--                    observeDOM: false-->
<!--                },-->
<!--                secondStop: 0,-->
<!--                scrollEvents: ['scroll','scroll-end'],-->
<!--                pullDownY:0,-->
<!--                der:0,-->
<!--                ind:0,-->
<!--                pullLoad:false-->
<!--            }-->
<!--        },-->
<!--        // props:{-->
<!--        //     groupid:{-->
<!--        //         type:Number,-->
<!--        //         default:9102-->
<!--        //     }-->
<!--        // },-->

<!--        created () {-->
<!--            this.getVideos()-->
<!--        },-->

<!--        // watch:{-->
<!--        //     groupid() {-->
<!--        //         this.getVideos();-->
<!--        //     }-->
<!--        // },-->
<!--        computed:{-->
<!--            ...mapGetters([-->
<!--                'videoGroupId'-->
<!--            ]),-->

<!--            videoGroup() {-->
<!--                return this.videoGroupId-->
<!--            }-->
<!--        },-->
<!--        watch:{-->
<!--            videoGroup(newid,old) {-->
<!--                console.log(newid,old)-->

<!--                this.$nextTick(() => {-->
<!--                    this.getVideos();-->
<!--                    this.$refs.slide.slide.refresh();-->
<!--                });-->
<!--              // this.getVideos()-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            getVideos () {-->
<!--                this.$api.video.videolist(this.videoGroupId).then((res) => {-->
<!--                    this.videos = res.data.datas;-->
<!--                    for (let i = 0; i < this.videos.length; i++) {-->
<!--                        this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)-->
<!--                        // console.log(this.videos[i].data.playTime);-->
<!--                        this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)-->
<!--                    }-->
<!--                    console.log(this.videos)-->
<!--                })-->
<!--            },-->

<!--            goback() {-->

<!--            },-->
<!--            rollBack() {-->
<!--                //点击下边的视频即往上滚动并播放。-->
<!--                this.$refs.slide.slide.next();  //注意写法。-->
<!--                this.$refs.slide.slide.refresh();-->
<!--            },-->
<!--            changePage(current) {-->
<!--                console.log('当前轮播图序号为:' + current)-->
<!--                this.ind = current;-->
<!--                this.setCurrentIndex(current)-->
<!--                // if(current === this.videos.length-1) {-->
<!--                //     this.pullLoad = true;-->
<!--                //     this.onPullingUp();-->
<!--                // }else {-->
<!--                //     this.pullLoad = false;-->
<!--                // }-->
<!--            },-->

<!--            onPullingUp() {-->
<!--                // const _videos = this.videos;-->
<!--                setTimeout(() => {-->
<!--                    // if (this.pullLoad) {-->
<!--                    //     this.videos = [] // 清空数据，以防重复渲染-->
<!--                    // };-->
<!--                    this.getVideos(9104);-->
<!--                    // this.videos = this.videos + _videos;-->
<!--                    // this.$refs.slide.slide.forceUpdate();-->
<!--                    this.$refs.slide.slide.refresh();-->
<!--                    this.pullLoad = false;-->
<!--                }, 1000);-->
<!--            },-->

<!--            ...mapMutations({-->
<!--                setCurrentIndex: 'SET_CURRENT_INDEX',-->
<!--            })-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped lang="stylus" rel="stylesheet/stylus">-->
<!--  @import "../../common/stylus/variable"-->
<!--  @import "../../common/stylus/mixin"-->

<!--  .wonderful-->
<!--    height:667px-->
<!--    widows:375px-->
<!--    background-color:black-->
<!--    position:relative-->
<!--    z-index:2001-->
<!--    .wonderful-header-->
<!--      height:50px-->
<!--      width:375px-->
<!--      background-color:black-->
<!--      color:white-->
<!--      font-size:$font-size-medium-x-->

<!--    .slides-->
<!--      height:617px-->
<!--      width:100%-->
<!--      position:absolute-->
<!--      bottom:0-->
<!--      top:50px-->
<!--      overflow:hidden //避免产生自然滚动bug-->
<!--      .cube-slide-->
<!--        height:308.47px  //也代表轮播偏移滑动距离-->
<!--        overflow:visible //不让偏移出去的轮播项被隐藏-->
<!--        .slide-item-->
<!--          height:308.47px !important-->
<!--          width:100%-->


<!--    .pullload-->
<!--      position:absolute-->
<!--      bottom:150px-->
<!--      width:100%-->
<!--      height:30px-->
<!--      margin-top:100px-->
<!--      background-color:black-->
<!--      flex-center()-->
<!--      .load-->
<!--        font-size:$font-size-medium-->
<!--        i-->
<!--          color:red-->
<!--        span-->
<!--          color:gray-->
<!--          font-size:$font-size-medium-->
<!--</style>-->

<template>
  <div class=wonderful>

    <nav-bar class="wonderful-header">
      <i class="iconfont iconlive" slot="left" @click="goback"></i>
      <div slot="center" class="music">精彩视频</div>
    </nav-bar>

    <div class="slides">

      <cube-slide
        ref="slide"
        :data="videos"
        direction="vertical"
        :showDots="false"
        :loop="false"
        :autoPlay="false"
        :options="options"
        @change="changePage"
        class="cube-slide">
        <cube-slide-item v-for="(item, index) in videos" :key="index"  class="slide-item" :style="{Height:height}">

          <wonderful-base
            :videos="videos"
            :item="item"
            :index="index"
            :ind="ind"
            :pullDownY="pullDownY"
            @rollback="rollBack"
            class="base"
            ref="base"
          >
          </wonderful-base>

        </cube-slide-item>
      </cube-slide>


    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import navBar from "../../base/navbar/navbar"
    import wonderfulBase from "../../base/video/wonderfulbase"
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
                index: 0,
                options: {
                    pullUpLoad: true,
                    probeType:1,
                    momentum: false,
                    click: true,
                    observeDOM: false
                },
                secondStop: 0,
                scrollEvents: ['scroll','scroll-end'],
                pullDownY:0,
                der:0,
                ind:0,
                height:308.47
            }
        },
        // props:{
        //     groupid:{
        //         type:Number,
        //         default:9102
        //     }
        // },
        created () {
            // this.getVideos()
            this.$nextTick(() => {
                this.getVideos();
                // this.$refs.slide.slide.refresh();
            });
        },
        // mounted() {
        //     this.getVideos()
        // },
        computed:{
            ...mapGetters([
                'videoGroupId'
            ]),

            videoGroup() {
                return this.videoGroupId
            }
        },
        // watch:{
        //     videoGroup(newid,old) {
        //         console.log(newid,old)
        //
        //         this.$nextTick(() => {
        //             this.getVideos();
        //             this.$refs.slide.slide.refresh();
        //         });
        //     }
        // },
        methods: {
            getVideos () {
                this.$api.video.videolist().then((res) => {
                    this.videos = res.data.datas;
                    for (let i = 0; i < this.videos.length; i++) {
                        this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
                        // console.log(this.videos[i].data.playTime);
                        this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)
                    }
                    // console.log(this.videos)
                })
            },
            goback() {
            },
            rollBack() {
                //点击下边的视频即往上滚动并播放。
                this.$refs.slide.slide.next();  //注意写法。
                this.$refs.slide.slide.refresh();
            },
            changePage(current) {
                console.log('当前轮播图序号为:' + current)
                this.ind = current;
                this.setCurrentIndex(current)
            },

            ...mapMutations({
                setCurrentIndex: 'SET_CURRENT_INDEX',
            })
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
    .slides
      height:617px
      margin-top:50px
      width:100%
      position:absolute
      bottom:0
      overflow:hidden //避免产生自然滚动bug
      .cube-slide
        height:308.47px  //也代表轮播偏移滑动距离
        overflow:visible //不让偏移出去的轮播项被隐藏
        .slide-item
          height:308.47px !important
          width:100%
</style>
