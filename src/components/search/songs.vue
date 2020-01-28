<template>
  <div class="wrapper">

     <div class="pullloadtop" v-if="!songs.length">
      <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
     </div>  

    <cube-sticky :pos="scrollY" v-else>
      <cube-scroll
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        ref="contentScroll"
        >
        <cube-sticky-ele>
          <ul class="sticky-header" v-show="!allShow">
              <li class="play-left">
                <i class="iconfont iconbofang2"></i>
                <span>
                  播放全部
                </span>
              </li>
              <li class="play-right">
                <i class="iconfont icontuozhuai"></i>
                <span>
                  多选
                </span>
              </li>

            </ul>

            <ul class="sticky-header" v-show="allShow" @click.self="allCheck">
              <li @click="allCheck">
                <cube-checkbox v-model="checked">
                  全选
                </cube-checkbox>
              </li>
              <li class="complete" @click.self="toComplete">完成</li>
            </ul>

        </cube-sticky-ele>
         <ul class="my-content">
            <li v-for="(item,index) in songs" :key="index" class="li">
              <song-base class="my-songs-base">
                <i slot="left" class="iconfont iconlaba" @click.stop="toIt" v-if="isPlay"></i>
                <div slot="top">
                  {{item.name}}
                </div>
                <div slot="center">
                  {{item.artists[0].name}} - {{item.album.name}}
                </div>
                <div slot="bottom" v-if="item.alias.length">
                  {{TransAlias(item.alias)}}
                </div>
                <i slot="rightPlay" class="iconfont iconbofang2" v-if="item.fee"></i>
                <i slot="rightMore" class="iconfont icon-ellipsis" @click.stop="toIt"></i>
              </song-base> 
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
    </cube-sticky>
  </div>
</template>

<script>
import followBase from '../../base/swiper/followbase'
import songBase from '../../base/swiper/searchsong'

export default {
  components: {
    followBase,
    songBase
  },
  props: {
    value:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false 
      },
      scrollY: 0,
      scrollEvents: ['scroll'],
      multimatch:{},
      isPlay:false,
      song: {},
      songs:[],
      checked: false,
      allShow: false,
      complete: false,
      hasMore: true,
      songCount:'',
      offset:0,
      count:0
    }
  },
  watch: {},
  computed: {},
  methods: {
    getSongs (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.songCount = res.data.result.songCount
        this.hasMore = this.count < this.songCount
        if(this.hasMore) {
          this.count+=30
          this.offset+=10
        }
        this.songs =  this.songs.concat(res.data.result.songs)
      })
    },
    toIt () {

    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    onPullingUp () {
      if(!this.hasMore) return
      setTimeout(() => {
        this.getSongs(this.value, 30, this.offset, 1)
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      }, 1000)
    },
    allCheck () {
    },
    toComplete () {},
    TransAlias (alias) {
      let arr = []
      for(let i = 0; i < alias.length; i++) {
        arr.push(alias[i])
      }
      return arr.join('/')
    },
  },
  created() {
    this.getSongs(this.value, 60, 0, 1)
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .wrapper
    .sticky-header
      flex-between()
      height:40px
      background-color:white
      border-bottom:.5px solid rgba(128,128,128,.2)
      margin-top:-2px
      .play-left
        margin-left:10px
        font-size:$font-size-medium-x
        font-weight:bold
      .play-right
        margin-right:10px  

  .wrapper
    height:567px
    background-color:white
    margin-top:15px
    .sticky-view-scroll
      .sticky-view-container
        position: absolute
        top: 50px
        bottom: 0
        left: 0
        width: 100% 

  .wrapper      
    .my-content
      .li
        border-bottom:.5px solid rgba(128,128,128,.2)
        margin-bottom:10px  


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
    // margin:10px auto
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
</style>