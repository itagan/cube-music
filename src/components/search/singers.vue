<template>
  <div class="wrapper">
    <div class="pullloadtop" v-if="artistCount === 0"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div> 

    <div class="content-scroll-wrapper" v-if="artistCount > 0">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        >
        <ul class="content" v-if="artists.length">
          <li v-for="(item,index) in artists" :key="index" @click="toUser(item.id)">
            <follow-base class="my-singers-base">
              <img v-lazy="item.img1v1Url" alt="" slot="left" class="img" v-if="item && item.img1v1Url"> 
              <div slot="liRight" class="limit" v-if="item && item.name">
               {{item.name}}
               <span class="li-right" v-if="item && item.alias.length">({{(item.alias[0])}})</span>
              </div>
              <div slot="rightFollow" class="right-share" v-if="item">
                <i class="iconfont iconwodeshoucang"></i>
                <span>已入驻</span>
              </div>
            </follow-base>
          </li>
        </ul>

        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="pullload">
            <template>
                <span v-if="props.isPullUpLoad" class="load">
                  <i class="iconfont iconyinletiaodongzhuangtai" v-if="hasMore"></i>
                  <span v-if="hasMore"> 加载中...</span>
                  <span v-if="!hasMore"> 没有更多了呢</span>
                </span>
            </template>
          </div>
        </template>

      </cube-scroll>
    </div>
  </div>
</template>

<script>
import followBase from '../../base/swiper/followbasesmall'
export default {
  components: {
    followBase
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false // 解决点击事件被触发两次的问题
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      pullDownY: 0,
      hasMore: true,
      songCount: '',
      offset: 0,
      count: 0,
      artists: [],
      result: true,
      artistCount: 0
    }
  },
  watch: {
    currentPage (val) {
      if (val === 4 && !this.artists.length) {
        this.getSingers(this.value, 30, 0, 100)
      }
    }
  },
  computed: {},
  methods: {
    getSingers (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.artistCount = res.data.result.artistCount
        this.hasMore = this.count < res.data.result.artistCount
        if (this.hasMore) {
          this.count += 30
          this.offset += 10
        }
        this.artists = this.artists.concat(res.data.result.artists)
        setTimeout(() => {
          this.result = this.artistCount > 0
        }, 3000)
      })
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    onPullingUp () {
      if (!this.hasMore) return
      setTimeout(() => {
        this.getSingers(this.value, 30, this.offset, 100)
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      }, 1000)
    },
    TransAlias (alias) {
      let arr = []
      for (let i = 0; i < alias.length; i++) {
        arr.push(alias[i])
      }
      return arr.join('/')
    },
    toUser (id) {
      this.$api.singers.singermusic(id).then(res => {
        if (res.data.artist.accountId) {
          let userId = res.data.artist.accountId
          this.$router.push({
            path: `/singer/${userId}/${id}`
          })
        } else {
          let userId = 477726475
          this.$router.push({
            path: `/singer/${userId}/${id}`
          })
        }
      })
    }
  },
  created () {
    // this.getSingers(this.value, 30, 0, 100)
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:100%
    width:100%
    background-color:white
    margin-top:22px
    // margin-bottom:50px
    .content
      li
        margin:10px auto
        img 
          width:50px
          height:50px 
          border-radius:50%
        .li-right
          font-size:$font-size-small
          color:gray   
        .limit
          max-width:225px
          ellipsis() 
  .content-scroll-wrapper
    position:absolute
    height:567px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:20px
    background-color:white 
    .content
      height: 100%
      overflow: hidden      


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

  //上方加载中相关样式
  .pullloadtop
    width:100%
    height:30px
    // margin-top:150px
    position:relative
    top:150px
    z-index:1
    flex-center()
    .load
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray  
    .no-result
     color:gray  
     font-size:$font-size-medium   
</style>