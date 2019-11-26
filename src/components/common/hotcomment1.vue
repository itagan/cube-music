<!--<template>-->
<!--  <transition name="fade-skubase">-->
<!--    <cube-sticky :pos="scrollY">-->
<!--      -->
<!--      <cube-sticky-ele ele-key="11">-->
<!--        <ul class="sticky-header">-->
<!--          <li>111</li>-->
<!--        </ul>-->
<!--      </cube-sticky-ele>-->

<!--  <div class="all" v-if="visible">-->
<!--    <div class="alltop">-->
<!--      <div class="alltopleft">-->
<!--        <span>精彩评论</span>-->
<!--        <span>({{total}})</span>-->
<!--      </div>-->
<!--      <div @click="hide">-->
<!--        <i class="iconfont iconmaike"></i>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div v-if="!this.comments.length">-->
<!--      加载中-->
<!--    </div>-->
<!--    <div class="scroll-list-wrap" v-else>-->
<!--      <cube-scroll-->
<!--        ref="scroll"-->
<!--        :data="comments"-->
<!--        :options="options"-->
<!--        @pulling-up="onPullingUp"-->
<!--        @scroll-end="scrollEnd"-->
<!--        @scroll="scrolls"-->
<!--        :scrollEvents = "scrollEvents"-->
<!--      >-->
<!--&lt;!&ndash;        <div class="sticky">精彩评论</div>&ndash;&gt;-->
<!--        <ul  class="hotul">-->
<!--          <li v-for="item in comments" class="hotli">-->
<!--            <base-comment :item="item"></base-comment>-->
<!--          </li>-->
<!--        </ul>-->

<!--        <template slot="pullup" slot-scope="props">-->
<!--          <div v-if="props.pullUpLoad" class="pullload">-->
<!--              <template>-->
<!--                <span v-if="props.isPullUpLoad" class="load">-->
<!--                   <i class="iconfont iconyinletiaodongzhuangtai"></i>-->
<!--                  <span> 正在加载...</span>-->
<!--                </span>-->
<!--&lt;!&ndash;                <span v-else>更新成功</span>&ndash;&gt;-->
<!--              </template>-->
<!--          </div>-->
<!--        </template>-->

<!--      </cube-scroll>-->
<!--    </div>-->
<!--  </div>-->
<!--    </cube-sticky>-->
<!--  </transition>-->
<!--</template>-->

<template>
  <transition name="fade-skubase">
      <div class="all" v-if="visible">
        <div class="alltop">
          <div class="alltopleft">
            <span>精彩评论</span>
            <span>({{total}})</span>
          </div>
          <div @click="hide">
            <i class="iconfont iconmaike"></i>
          </div>
        </div>
        <div v-if="!this.comments.length">
          加载中
        </div>
        <div class="scroll-list-wrap" v-else>
          <cube-scroll
            ref="scroll"
            :data="comments"
            :options="options"
            @pulling-up="onPullingUp"
            @scroll-end="scrollEnd"
            @scroll="scrolls"
            :scrollEvents = "scrollEvents"
          >
            <ul  class="hotul">
              <li v-for="item in comments" class="hotli">
                <base-comment :item="item"></base-comment>
              </li>
            </ul>

            <template slot="pullup" slot-scope="props">
              <div v-if="props.pullUpLoad" class="pullload">
                <template>
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 正在加载...</span>
                </span>
                  <!--                <span v-else>更新成功</span>-->
                </template>
              </div>
            </template>

          </cube-scroll>
        </div>
      </div>
  </transition>
</template>

<script>
    import BaseComment from '../../base/basecomment/basecomment'
import {timestampother} from '../../assets/js/timestamp'

    export default {
      name: 'hotcomment.vue',
      components: {
        BaseComment
      },
      data () {
        return {
          comments: [],
          item: {},
          total: '',
          visible: false,
                // 滚动配置
                // pullDownRefresh: false,
                // pullDownRefreshThreshold: 60,
                // pullDownRefreshStop: 40,
                // pullDownRefreshTxt: 'Refresh success',
          pullUpLoad: true,
          pullUpLoadThreshold: 0,
          pullUpLoadMoreTxt: '加载中…………',
          pullUpLoadNoMoreTxt: '没有更多数据了~'
                // listenScroll:true

        }
      },
      props: {
        detail: {
          type: Object,
          default: {}
        }
      },
        // created() {
        //     this.getHotcomment()
        // },
      computed: {
        options () {
          return {
                    // pullDownRefresh: this.pullDownRefreshObj,
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: true,
            probeType: 1

          }
        },
        scrollEvents () {
          return [
            'scroll',
            'scroll-end'
          ]
        },
            // pullDownRefreshObj: function() {
            //     return this.pullDownRefresh ? {
            //         threshold: parseInt(this.pullDownRefreshThreshold),
            //         // Do not need to set stop value, but you can if you want
            //         // stop: parseInt(this.pullDownRefreshStop),
            //         txt: this.pullDownRefreshTxt
            //     } : false
            // },
        pullUpLoadObj: function () {
          return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          } : false
        }
      },
      watch: {
            // 监控父组件传递过来的vid变化则重新渲染新相关推荐数据
        detail () {
          this.getHotcomment()
        }
      },
      methods: {
        getHotcomment () {
          this.$api.video.hotcomment(this.detail.vid).then(res => {
            if (this.isPullUpLoad) {
              this.comments = [] // 清空数据，以防重复渲染
            }
            this.comments = res.data.hotComments
            this.total = res.data.total
            for (let i = 0; i < this.comments.length; i++) {
              this.comments[i].time = timestampother(this.comments[i].time)
            }
          })
        },
        onPullingUp () {
                // 更新数据
          setTimeout(() => {
            if (Math.random() > 0.5) {
                        // 如果有新数据
              this.getHotcomment()
              let newPage = this.comments
              this.comments = this.comments.concat(newPage)
              this.$refs.scroll.forceUpdate()
            } else {
                        // 如果没有新数据
              this.$refs.scroll.forceUpdate()
            }
          }, 1000)
        },
        scrollEnd (pos) {
          console.log(pos)
          if (pos.y > 0) {
            console.log('11')
          }
        },
        scrolls (pos) {
          if (pos.y > 0) {
            console.log('11')
          }
        },
            // 展开或者隐藏全部评价
        show () {
          this.visible = true
          console.log('成功')
        },
        hide () {
          this.visible = false
            // 告诉父组件你该显示了
          setTimeout(() => {
            this.$emit('parshow')
          }, 200)
        }

      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .all
    margin:auto 10px
    z-index:999
    /*margin-bottom:50px*/
    .alltop
      flex-between()
      margin-bottom:2px
      background-color:white
      height:35px
      line-height:35px
      .alltopleft
        font-size:$font-size-medium-x
    .scroll-list-wrap
      height: 415px;
      overflow: hidden;
      /*position:relative*/

    .hotul
      margin-top:2px
      .hotli
        margin-bottom:2px
    .pullload
      width:100%
      height:30px
      margin-top:1px
      background-color:white
      flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray

    /*.sticky*/
    /*  position:sticky*/
    /*  height:35px*/
    /*  background-color:gray*/

  /*动画效果*/
  .fade-skubase-enter-active,
  .fade-skubase-leave-active
    transition: transform .3s ease-in

  .fade-skubase-enter,
  .fade-skubase-leave-to
    /* .list-leave-active for below version 2.1.8 */
    transform: translateY(600px);

</style>
