<template>
  <transition name="fade-comment" v-if="visible">
    <div class="sticky-view-container">
    <cube-sticky :pos="scrollY">
      <cube-scroll
        :scroll-events="scrollEvents"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        :options="options"
        ref="scroll"
      >
        <cube-sticky-ele ele-key="精彩评论">
          <ul class="sticky-header">
            <li class="all-top">
              <div class="all-top-left">
                <span>精彩评论</span>
                <span>({{total}})</span>
              </div>
              <div @click="hide" class="hide">
                <i class="iconfont iconmaike"></i>
              </div>
            </li>
          </ul>
        </cube-sticky-ele>
        <div v-if="!this.comments.length" class="pull-load">
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 正在加载...</span>
                </span>
        </div>
        <ul  class="hot-ul" v-else>
          <li v-for="(item, index) in comments" class="hot-li" :key="index">
            <base-comment :item="item"></base-comment>
          </li>
        </ul>
        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="pull-load">
            <template v-if="loadIsShow">
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 加载中...</span>
                </span>
                <span v-else>更新成功</span>
            </template>
          </div>
        </template>
      </cube-scroll>
    </cube-sticky>
    </div>
  </transition>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex'
    import BaseComment from '../../base/basecomment/basecomment'
    import {timestampOther} from '../../assets/js/timestamp'

    export default {
      name: 'hotComment.vue',
      components: {
        BaseComment
      },
      data () {
        return {
          allComments: [],
          comments: [],
          item: {},
          total: '',
          visible: false,
          scrollEvents: ['scroll'],
          scrollY: 0,
          pullUpLoad: true,
          pullUpLoadThreshold: 0,
          pullUpLoadMoreTxt: '加载中…………',
          pullUpLoadNoMoreTxt: '没有更多数据了~',
          loadIsShow: false // 上拉加载是否显示,数据全部加载完则不显示了
        }
      },
      props: {
        detail: {
          type: Object,
          default: {}
        }
      },
      watch: {
            // 监控父组件传递过来的vid变化则重新渲染新相关推荐数据
        detail () {
          this.getHotComment()
        }
      },
      computed: {
        options () {
          return {
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: true,
            probeType: 1
          }
        },
        pullUpLoadObj: function () {
          return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          } : false
        },
        ...mapGetters([
          'hotLimit'
        ])
      },
      methods: {
        getHotComment (hotLimit) {
          this.$api.video.hotcomment(this.detail.vid, hotLimit).then(res => {
            this.total = res.data.total
            if (this.isPullUpLoad) {
              this.comments = [] // 清空数据，以防重复渲染
            };

            this.comments = res.data.hotComments
            for (let i = 0; i < this.comments.length; i++) {
              this.comments[i].time = timestampOther(this.comments[i].time)
            }
          })
        },
        scrollHandler (pos) {
          this.scrollY = -pos.y
          if (pos.y > 10) {
            setTimeout(() => {
              this.hide()
            }, 100)
          }
        },
        onPullingUp () {
          this.loadIsShow = this.comments.length >= this.hotLimit

            // 改用vuex方式获取设置上拉加载的索引：实现上拉加载新数据效果
            // 更新数据
            // 获取原数据并增加数据然后设置新的vuex
            // let newlimit = this.limit + 10;
          setTimeout(() => {
            if (this.isPullUpLoad) {
              this.comments = [] // 清空数据，以防重复渲染
            };
            this.getHotComment(this.hotLimit + 10)
            let newPage = this.comments.slice(this.hotLimit, this.hotLimit + 10)

            if (newPage) {
                        // 如果有新数据
                        // 获取新数据并渲染出来
              this.comments = this.comments.concat(newPage)
              this.$refs.scroll.forceUpdate()
            } else {
                        // 如果没有新数据
                        // 取消加载中，并刷新下滚动组件
                        // this.$refs.scroll.refresh();
              this.$refs.scroll.forceUpdate()
            }
          }, 1000)
            // 再把新数据设置到vuex
          this.setHotLimit(this.hotLimit + 10)
        },
            // 展开或者隐藏全部评价
        show () {
          this.visible = true
        },
        hide () {
          this.visible = false
            // 告诉父组件你该显示了
          setTimeout(() => {
            this.$emit('pageshow')
          }, 200)
            // 把vuex的数据还原
          this.setHotLimit(20)
            // 页面数据也清空
            // this.comments = [];
        },
        ...mapMutations({
          setHotLimit: 'SET_HOT_LIMIT'
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .sticky-view-container
    position: absolute
    top: 223px
    bottom: 0
    left: 0
    width: 100%
    z-index:2001
    .hot-ul
      margin-top:8px
    .sticky-header
      .all-top
        flex-between()
        margin-bottom:2px
        background-color:white
        height:40px
        line-height:40px
        font-size:$font-size-large
        border-bottom:1px solid #dcdcdc
        .all-top-left
          color:black
        .hide
          width:50px
          height:40px
          line-height: 40px
          text-align:right
          color:gray
    .cube-sticky
      padding: 0 10px
      .cube-scroll-wrapper
        background-color: #fff
    .cube-sticky-fixed
      .sticky-header
        margin: 0 10px

     //加载中相关样式
    .pull-load
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

  /*动画效果*/
  .fade-comment-enter-active,
  .fade-comment-leave-active
    transition: transform .4s ease-in

  .fade-comment-enter,
  .fade-comment-leave-to
    transform: translateY(600px);

</style>
