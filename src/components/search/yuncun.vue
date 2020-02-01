<template>
  <div class="wrapper">
    <div class="pullloadtop" v-if="!talks.length || !mlogs.length"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div> 

    <cube-sticky :pos="scrollY" v-else>
      <cube-scroll
        :scroll-events="scrollEvents"
        @scroll="scrollHandler">
        <cube-sticky-ele ele-key="主题"  v-if="talk.talks">
          <ul class="sticky-header">
            <li>主题</li>
          </ul>
        </cube-sticky-ele>
         <ul class="my-talks" v-if="talk.talks">

          <li v-for="(item,index) in talk.talks" :key="index" class="li">
            <follow-base>
              <img :src="item.showCover.url" alt="" slot="left" class="img"> 
              <div slot="top" class="limit">
               <div class="limit-top"> # {{item.talkName}}</div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom">
                  {{item.follows}}人关注
                {{item.participations}}人参与
                </div>
              </div>
              <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
            </follow-base>
          </li>
           <li class="my-bottom" v-if="talk.more">
            <span>{{talk.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>
        <cube-sticky-ele ele-key="Mlog" v-if="mlog.mlogs">
          <ul class="sticky-header">
            <li>Mlog</li>
          </ul>
        </cube-sticky-ele>
        <ul class="my-mlogs" v-if="mlog.mlogs">
          
          <li class="my-mlogs-li">
            <ul>
              <li v-for="(item,index) in mlog.mlogs" :key="index">
                <log-base :item="item"></log-base>
              </li>
            </ul>
          </li>

          <li class="my-mlogs-li">
            <ul>
              <li v-for="(item,index) in mlog.mlogs" :key="index">
                <log-base :item="item"></log-base>
              </li>
            </ul>
          </li>

          <li class="my-mlogs-li">
            <ul>
              <li v-for="(item,index) in mlog.mlogs" :key="index">
                <log-base :item="item"></log-base>
              </li>
            </ul>
          </li>


           <li class="my-bottom" v-if="mlog.more">
            <span>{{mlog.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>
        </cube-scroll>
      <template slot="fixed" slot-scope="props">
        <ul class="sticky-header">
          <li>{{props.current}}</li>
        </ul>
      </template>
    </cube-sticky>
  </div>
</template>

<script>
import followBase from '../../base/swiper/followbase'
import logBase from '../../base/swiper/logbase'

export default {
  components: {
    followBase,
    logBase
  },
  props: {
    value:{
      type:String,
      default:''
    },
    currentPage:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      scrollEvents: ['scroll'],
      scrollY: 0,
      mlog:{},
      talk:{},
      mlogs:[],
      talks:[],
      loadData:true,
      result:true
    }
  },
  watch: {
    currentPage(val) {
      if(val === 2 && this.loadData) {
        this.getAlls(this.value, 60, 0, 1018)
        this.loadData = false
      } 
    }
  },
  computed: {},
  methods: {
    getAlls (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.mlog = res.data.result.mlog || {}
        this.mlogs = (res.data.result.mlog && res.data.result.mlog.mlogs) || []
        this.talk = res.data.result.talk || {}
        this.talks = (res.data.result.talk && res.data.result.talk.talks) || []

        setTimeout(() => {
          // this.result = this.userprofileCount > 0 ? true : false
          if(!res.data.result.mlog || !res.data.result.talk) {
            this.result = false
          }
        }, 3000)
      })
    },
    scrollHandler({ y }) {
      this.scrollY = -y
    }
  },
  created() {
    // this.getAlls(this.value, 60, 0, 1018)
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

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
  .sticky-header
    background-color:white
    height:30px
    line-height:30px
    margin-top:-2px
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