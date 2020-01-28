<template>
  <div class="wrapper">

     <div class="pullloadtop" v-if="!djRadios.length">
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
          <ul class="sticky-header">
              <li class="play-left">
                <span>
                  电台
                </span>  
              </li>       
            </ul>
        </cube-sticky-ele>
        <ul class="content">
           <li v-for="(item,index) in djRadios" :key="index">
            <list-base>
              <img :src="item.picUrl" alt="" slot="left" class="img"> 
              <div slot="top">
                # {{item.name}}
              </div>
              <div slot="bottom">
                {{item.dj.nickname}}
              </div>
            </list-base>
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
import listBase from '../../base/swiper/listbasesmall'


export default {
  components: {
    listBase
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
      hasMore: true,
      offset:0,
      count:0,
      djRadios:[]
    }
  },
  watch: {},
  computed: {},
  methods: {
    getRadios (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.hasMore = this.count < res.data.result.djRadiosCount
        if(this.hasMore) {
          this.count+=30
          this.offset+=10
        }
        this.djRadios =  this.djRadios.concat(res.data.result.djRadios)
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
        this.getRadios(this.value, 30, this.offset, 1009)
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
    this.getRadios(this.value, 60, 0, 1009)
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
        font-size:$font-size-medium

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
    .content
      li
        img 
          width:50px
          height:50px 
          border-radius:5px


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