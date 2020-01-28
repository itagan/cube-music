<template>
  <div class="wrapper">
    <cube-sticky :pos="scrollY">
      <cube-scroll
        :scroll-events="scrollEvents"
        @scroll="scrollHandler">
        <cube-sticky-ele ele-key="主题">
          <ul class="sticky-header">
            <li>主题</li>
          </ul>
        </cube-sticky-ele>
         <ul class="my-talks">

          <li v-for="(item,index) in talk.talks" :key="index" @click="selectItem(item.vid)" class="li">
            <follow-base>
              <img :src="item.showCover.url" alt="" slot="left" class="img"> 
              <div slot="top">
                # {{item.talkName}}
              </div>
              <div slot="bottom">
                {{item.follows}}人关注
                {{item.participations}}人参与
              </div>
              <i slot="rightShare" class="iconfont iconleft-arrow" @click.stop="toIt"></i>
            </follow-base>
          </li>
           <li class="my-bottom" v-if="talk.more">
            <span>{{talk.moreText}}</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
        </ul>
        <cube-sticky-ele ele-key="Mlog">
          <ul class="sticky-header">
            <li>Mlog</li>
          </ul>
        </cube-sticky-ele>
        <ul class="my-mlogs">
          
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
    }
  },
  data() {
    return {
      scrollEvents: ['scroll'],
      scrollY: 0,
      mlog:{},
      talk:{},
    }
  },
  watch: {},
  computed: {},
  methods: {
    getAlls (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        
        this.mlog = res.data.result.mlog
        this.talk = res.data.result.talk
       
      })
    },
    scrollHandler({ y }) {
      this.scrollY = -y
    }
  },
  created() {
    this.getAlls(this.value, 60, 0, 1018)
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
      position: relative
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
</style>