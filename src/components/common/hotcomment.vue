
<template>
  <transition name="fade-skubase" v-if="visible">

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
            <li class="alltop">
              <div class="alltopleft">
                <span>精彩评论</span>
                <span>({{total}})</span>
              </div>
              <div @click="hide" class="hide">
                <i class="iconfont iconmaike"></i>
              </div>
            </li>
          </ul>
        </cube-sticky-ele>

        <div v-if="!this.comments.length" class="pullload">
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 正在加载...</span>
                </span>
        </div>

        <ul  class="hotul" v-else>
          <li v-for="item in comments" class="hotli">
            <base-comment :item="item"></base-comment>
          </li>
        </ul>

        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="pullload">
            <template v-if="loadisshow">
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 加载中...</span>
                </span>
                <span v-else>更新成功</span>
            </template>
          </div>
        </template>

      </cube-scroll>
<!--      <template slot="fixed" slot-scope="props">-->
<!--        <ul class="sticky-header">-->
<!--          <li>{{props.current}}</li>-->
<!--        </ul>-->
<!--      </template>-->
    </cube-sticky>
    </div>
  </transition>
</template>




<script>
    import {mapGetters, mapMutations} from 'vuex'
    import BaseComment from "../../base/basecomment/basecomment";
    import {timestampother} from '../../assets/js/timestamp'

    export default {
        name: "hotcomment.vue",
        components: {
            BaseComment
        },
        data() {
            return {
                allcomments:[],
                comments: [],
                item: {},
                total:'',
                visible:false,
                scrollEvents: ['scroll'],
                scrollY: 0,

                pullUpLoad: true,
                pullUpLoadThreshold: 0,
                pullUpLoadMoreTxt: '加载中…………',
                pullUpLoadNoMoreTxt: '没有更多数据了~',

                loadisshow:false //上拉加载是否显示,数据全部加载完则不显示了
            }
        },
        props: {
            detail: {
                type: Object,
                default: {}
            }
        },
        created() {
            this.getHotcomment();
            // setTimeout(()=> {
            //     this.getHotcomment();
            // },1000);
        },
        watch: {
            //监控父组件传递过来的vid变化则重新渲染新相关推荐数据
            detail() {
                this.getHotcomment();
                // setTimeout(()=> {
                //     this.getHotcomment();
                // },1000);
            }
        },
        computed: {
            options() {
                return {
                    // pullDownRefresh: this.pullDownRefreshObj,
                    pullUpLoad: this.pullUpLoadObj,
                    scrollbar: true,
                    probeType: 1,


                }
            },
            pullUpLoadObj: function() {
                return this.pullUpLoad ? {
                    threshold: parseInt(this.pullUpLoadThreshold),
                    txt: {
                        more: this.pullUpLoadMoreTxt,
                        noMore: this.pullUpLoadNoMoreTxt
                    }
                } : false
            },
            ...mapGetters([
                'limit'
            ])
        },
        methods: {
            getHotcomment(limit) {
               // console.log(this.limit);
                this.$api.video.hotcomment(this.detail.vid,limit).then(res => {
                    this.total = res.data.total;
                    // this.allcomments = res.data.hotComments;
                    //因评论总数比较少，api未发现符合实际效果的参数。这里模拟分页数据，实现下拉加载中效果。每100条显示加载中
                    // let num =Math.ceil( this.total / 100);//向上取整
                    if (this.isPullUpLoad) {
                        this.comments = [] // 清空数据，以防重复渲染
                    };

                    this.comments = res.data.hotComments;
                    for (let i = 0; i < this.comments.length; i++) {
                        this.comments[i].time = timestampother(this.comments[i].time);
                    }
                })
            },
            scrollHandler(pos) {
                this.scrollY = -pos.y;
                // console.log(pos)
                if(pos.y > 10) {
                    setTimeout(()=> {
                        this.hide();
                    },100);
                }
            },
            onPullingUp() {
                //闭包保存上次上拉加载的数据位置  *****没作用*****
                // limit=20;
                // function Limit1(){
                //     // var limit=20;
                //     // 回调函数增加新数据
                //     nAdd=function(){this.limit+=10};
                //     function Limit2(){
                //         return this.limit;
                //     }
                //     //返回新数据
                //     return Limit2;
                // }
                // var result=Limit1();
                // result();
                // nAdd();
                console.log(this.limit + 10);
                //决定上拉加载效果是否显示出来
                this.loadisshow =  this.comments.length >= this.limit;

                //改用vuex方式获取设置上拉加载的索引：实现上拉加载新数据效果
                // 更新数据
                //获取原数据并增加数据然后设置新的vuex
                // let newlimit = this.limit + 10;
                setTimeout(() => {
                    if (this.isPullUpLoad) {
                        this.comments = [] // 清空数据，以防重复渲染
                    };
                    this.getHotcomment(this.limit + 10);
                    let newPage = this.comments.slice(this.limit,this.limit+10);

                    if (newPage) {
                        // 如果有新数据
                        //获取新数据并渲染出来
                        this.comments = this.comments.concat(newPage);
                        this.$refs.scroll.forceUpdate();
                    } else {
                        // 如果没有新数据
                        //取消加载中，并刷新下滚动组件
                        this.$refs.scroll.forceUpdate();
                    }
                }, 1000);
                //再把新数据设置到vuex
                this.setLimit(this.limit + 10);
            },
            //展开或者隐藏全部评价
            show(){
                this.visible = true;
            },
            hide() {
                this.visible = false;
                //告诉父组件你该显示了
                setTimeout(()=> {
                    this.$emit('parshow');
                },200);
                //把vuex的数据还原
                this.setLimit(20);
                //页面数据也清空
                // this.comments = [];
            },
            ...mapMutations({
                setLimit:'SET_LIMIT'
            })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .sticky-view-container
    position: absolute
    top: 45px
    bottom: 0
    left: 0
    width: 100%
    z-index:999
    .hotul
      margin-top:10px
    .sticky-header
      .alltop
        flex-between()
        margin-bottom:2px
        background-color:white
        height:40px
        line-height:40px
        font-size:$font-size-large
        border-bottom:1px solid #dcdcdc
        .alltopleft
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

  /*动画效果*/
  .fade-skubase-enter-active,
  .fade-skubase-leave-active
    transition: transform .4s ease-in

  .fade-skubase-enter,
  .fade-skubase-leave-to
    /* .list-leave-active for below version 2.1.8 */
    transform: translateY(600px);

</style>
