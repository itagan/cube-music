<template>
  <div class="content-scroll-wrapper">
    <cube-scroll
      ref="contentScroll"
      :scroll-events="scrollEvents"
      :options="options"
      @scroll="scrollHandler"
      @before-scroll-start = "beforeScrollStart"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="content">
        <my-search
          :placeholder="placeholder"
          :fake="fake"
          @query="getQuery"
          @click.native="goToSearch"
          class="singer-search"
        ></my-search>
        <ul class="my-singer">
          <li v-for="item in singers" :key="item.id" @click="selectItem(item.id)">
            <div class="li-left">
              <img :src="item.picUrl" alt="">
            </div>
            <div class="li-right">
              {{item.name}}
            </div>
            <span class="li-right-alias" v-if="item.alias.length" v-for="alia in item.alias">({{alia}})</span>
          </li>
        </ul>
      </div>

      <template slot="pulldown" slot-scope="props">
        <div v-if="props.pullDownRefresh"
             class="cube-pulldown-wrapper"
             :style="props.pullDownStyle">
          <div v-if="props.beforePullDown"
               class="before-trigger"
               :style="{paddingTop: props.bubbleY + 'px'}">
            <span :class="{rotate: props.bubbleY > options.pullDownRefresh.threshold - 60}" class="refresh-text">↓</span>
            <span v-if="props.bubbleY > options.pullDownRefresh.threshold - 60" class="refresh-text">下拉刷新</span>
            <span v-else class="refresh-text">松开刷新</span>
          </div>

          <div class="after-trigger" v-else>
            <div v-show="props.isPullingDown" class="loading">
              <i class="iconfont iconyinletiaodongzhuangtai"></i>
              <span> 更新中...</span>
            </div>
            <span :class="{rotate: props.bubbleY > 0}" v-show="!props.isPullingDown" class="refresh-text">↓下拉刷新</span>
          </div>
        </div>
      </template>
      <!--        <template slot="pullup" slot-scope="props">-->
      <!--          <div v-if="props.pullUpLoad" class="pullload">-->
      <!--            <template>-->
      <!--                <span v-if="props.isPullUpLoad" class="load">-->
      <!--                   <i class="iconfont iconyinletiaodongzhuangtai"></i>-->
      <!--                  <span> 加载中...</span>-->
      <!--                </span>-->
      <!--            </template>-->
      <!--          </div>-->
      <!--        </template>-->

    </cube-scroll>
  </div>
</template>

<script>
    import MySearch from '../../base/search/search'

    export default {
        name: "singer.vue",
        components: {
          MySearch,
        },
        data () {
          return {
            placeholder: '搜索歌手',
            fake:false,
            singers:[],
            options: {
              pullDownRefresh: {
                threshold: 60,
                stopTime: 1000,
                txt: '更新成功'
              },
              pullUpLoad: true,
              scrollbar: true,
              click: false // 解决点击事件被触发两次的问题
            },
            secondStop: 0,
            scrollEvents: ['scroll','before-scroll-start'],
            pullDownY: 0
          }
        },
        created() {
          this.getSingers()
        },
        methods: {
          getQuery (query) {
            console.log(query)
          },
          goToSearch () {
            this.fake = true
          },
          getSingers () {
            this.$api.subs.singers().then(res => {
              this.singers = res.data.data
              this.$emit('hasNum',res.data.count)
            })
          },
          selectItem (id) {

          },
          onPullingDown () {
            setTimeout(() => {
              this.singers = this.singers.reverse()
              this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
              this.$refs.contentScroll.forceUpdate();//下拉完毕
            }, 1000)
          },
          onPullingUp () {
            setTimeout(() => {
              const contentScroll = this.$refs.contentScroll
              contentScroll.forceUpdate()
              // contentScroll.refresh();
            }, 1000)
          },
          scrollHandler (pos) {
            this.pullDownY = -pos.y
          },
          beforeScrollStart() {
            this.fake = false
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .content
    height: 100%
    overflow: hidden
    .singer-search
      width:90%
      position:relative
      left:2.5%
    .my-singer
      width:100%
      background-color:white
      padding:10px 0
      li
        height:50px
        line-height:50px
        display: flex
        margin-top:13px
        .li-left
          margin-left:10px
          height:50px
          width:50px
          img
            width:100%
            height:100%
            border-radius:50%
         .li-right
           height:50px
           line-height:50px
           margin-left:10px
           font-size:$font-size-medium-x
         .li-right-alias
           font-size:$font-size-medium-x
           margin-left:5px

  .content-scroll-wrapper
    position:absolute
    height:617px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:100px
    top:50px
    .content
      height: 100%
      overflow: hidden


  .cube-pulldown-wrapper
    text-align: center
  .before-trigger
    height: auto
    font-size: 30px
    align-self: flex-end
    span
      display: inline-block
      line-height: 1
      transition: all 0.3s
      color: #666
      padding: 15px 0
      &.rotate
        transform: rotate(180deg)

  .after-trigger
    flex: 1
    margin: 0
    .loading
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray
    .text-wrapper
      margin: auto
      padding: 5px 0
      z-index:500
      position:relative
      width:140px
      height:18px
      text-align:center
      line-height:18px
      background-color:black
      opacity:0.4
      border-radius:15px
      top:0

  .refresh-text
    color: white
    font-size:$font-size-medium

  //加载中相关样式
  .pullload
    width:100%
    height:30px
    margin-top:1px
    background-color:white
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

  .cube-scroll-content
    height:auto

</style>

