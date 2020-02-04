<template>
  <div class="wrapper">

    <div class="pullloadtop" v-if="djRadiosCount === 0"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div> 

    <cube-sticky :pos="scrollY" v-if="djRadiosCount > 0">
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
        <ul class="content" v-if="djRadios.length">
           <li v-for="(item,index) in djRadios" :key="index" @click.stop="toRadio(item.id)">
            <list-base>
              <img v-lazy="item.picUrl" alt="" slot="left" class="img"> 
              <div slot="top" class="limit">
               <div class="limit-top">{{item.name}}</div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom">{{item.dj.nickname}}</div>
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
    },
    currentPage:{
      type:Number,
      default:0
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
      hasresult:true,
      offset:0,
      count:0,
      djRadios:[],
      result:true,
      djRadiosCount:0
    }
  },
  watch: {
    currentPage(val) {
      if(val === 8 && !this.djRadios.length) {
        this.getRadios(this.value, 60, 0, 1009)
      } 
    }
  },
  computed: {},
  methods: {
    getRadios (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        if(this.hasresult) {
          //手动api补全解决不全的bug
        if(res.data.result.djRadiosCount) {
          this.djRadiosCount = res.data.result.djRadiosCount
        }else {
          this.djRadiosCount = 0
        }
        setTimeout(() => {
          this.result = this.djRadiosCount > 0 ? true : false
          }, 3000)
          this.hasresult = false  //加上标识符判断 避免上拉加载时变成无结果逻辑bug
        }
        this.hasMore = this.count < this.djRadiosCount
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
    toRadio (id) {
    //   this.$router.beforeRouteLeave((to, from, next) => {
    //     if(to.name == 'radio'){
    //         to.meta.keepAlive = true
    //     }else{
    //         to.meta.keepAlive = true
    //       }
    //     next()
    //   })
      this.$router.push({
        path:`/radiolist/${id}`
      })
    },
    TransAlias (alias) {
      let arr = []
      for(let i = 0; i < alias.length; i++) {
        arr.push(alias[i])
      }
      return arr.join('/')
    },
  },
  // beforeRouteLeave (to, from, next) {
  //   if (to.name == 'radiolist') {
  //       to.meta.keepAlive = true
  //       from.meta.keepAlive = true
  //       console.log('是我吧')
  //   }
  //   else {
      
  //   }
  // },
  // beforeRouteLeave(to,from,next){
  //   if(from.name == 'radiolist'){
  //       to.meta.keepAlive = false
  //   }else{
  //       to.meta.keepAlive = true
  //   }
  //   next()
  // },
  created() {
    // this.getRadios(this.value, 60, 0, 1009)
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
    // margin-bottom:50px
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
        .limit  
          .limit-top
            max-width:295px
            ellipsis() 
          .limit-bottom
            max-width:295px
            ellipsis() 
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