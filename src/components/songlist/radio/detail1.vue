<template>
  <div class="wrapper">
    <!-- <div class="pullloadtop"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div>  -->

    <cube-sticky :pos="scrollY">
      <cube-scroll
        :scroll-events="scrollEvents"
        @scroll="scrollHandler">
        <cube-sticky-ele>
          <ul class="sticky-header">
            <li>共123期</li>
            <li>
              <i class="iconfont"></i>
              <span>排序</span>
            </li>
            <li>
              <i class="iconfont icontuozhuai"></i>
              <span>多选</span>
            </li>
          </ul>
        </cube-sticky-ele>
          <ul class="my-content">
          <li v-for="(item,index) in programs" :key="index" class="li" @click.stop="toCheckMusic(item, index)">
            <song-base class="my-songs-base">
              <!-- 添加一个key属性，来唯一标识该控件，被key标识后会重新渲染，避免不渲染样式bug问题 -->
              <div slot="leftCheck" class="check" ref="liSong" v-if="allShow" :key="1">
              </div>
              <div slot="left" v-if="!isPlay">
                {{index}}
              </div>
              <i slot="left" class="iconfont iconlaba" @click.stop="toIt" v-if="isPlay"></i>
              <div slot="top" class="limit">
                <div class="limit-top">
                  {{item.mainSong.name}}
                </div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom">
                  {{item.mainSong.duration}}
                </div>
              </div>
              <i slot="rightMore" class="iconfont icon-ellipsis" @click.stop="toMoreOpera(item)" v-if="!allShow" :key="2"></i>
            </song-base> 
            </li>
          </ul>
        </cube-scroll>
        <!-- <template slot="fixed" slot-scope="props">
          <ul class="sticky-header">
            <li>{{props.current}}</li>
          </ul>
        </template> -->
    </cube-sticky>
  </div>
</template>

<script>
import songBase from '../../../base/swiper/searchsong'

export default {
  components: {
    songBase
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    currentPage: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollEvents: ['scroll'],
      scrollY: 0,
      loadData: true,
      result: true,
      allShow: false,
      isPlay: false,
      programs: []
    }
  },
  watch: {
    currentPage (val) {
      if (val === 0 && this.loadData) {
        this.getAlls(this.id, 30, 0, false)
        this.loadData = false
      }
    }
  },
  computed: {},
  methods: {
    getAlls (rid, limit, offset, asc) {
      this.$api.radios.program(rid, limit, offset, asc).then(res => {
        this.programs = res.data.programs
      })
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    }
  },
  created () {
    // this.getAlls(this.value, 60, 0, 1018)
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"

.wrapper
  height:567px
  background-color:white
  margin-top:15px
  .sticky-view-scroll
    .sticky-view-container
      position: relative
      top: 100px
      bottom: 0
      left: 0
      width: 100%
  .sticky-header
    background-color:rgba(128,128,128,.5)
    height:30px
    line-height:30px
    flex-between()
    // padding-top:10px
    li
      margin-left:10px
  .my-mlogs
    height:auto
    width:100%
    .my-mlogs-li
      width:100%
      ul
        display:flex
  .my-talks
    min-height:100px
    li
      img 
        width:65px
        height:65px 
        border-radius:5px  
      .limit
        .limit-top
          max-width:250px
          ellipsis() 
        .limit-bottom
          max-width:250px
          ellipsis()       

  .my-top
    height:40px 
    line-height:40px 
    font-weight:bold
    font-size:$font-size-medium-x 
    margin-left:10px  
  .my-bottom
    height:40px 
    text-align:center
    font-size:$font-size-small
    color:gray   
    flex-center()
  .li
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