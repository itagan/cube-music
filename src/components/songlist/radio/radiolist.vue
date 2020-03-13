<template>
  <div class="radio"> 

   <!-- <div class="pullloadtop">
     <div>
        <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
     </div>
    </div> -->

    <my-header :title="title"  class="my-header" ref="myHeader"></my-header>
    <div class="user-background" ref="bgEnlarge">
      <img width="100%" height="100%" :src="djRadio.picUrl" alt="" ref="Enlarge">
    </div>
    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">

        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          @scroll-end="scrollEndHandler"
          @pulling-up="onPullingUp"
          :options="options"
          ref="Scroll"
          class="scroll-ele"
        >
          <my-message :djRadio="djRadio" ref="myMessage" @issub="issub"></my-message>

          <cube-sticky-ele class="header-content" style="height:auto">
            <ul class="sticky-header" ref="messTop">
               <li v-for="(item, index) in objs" :key="item.text">
                <div :index="index" @click="toggles(index)" class="li-text" :class="[currentPage === index ? activeClass : '']"> {{item.text}} </div>
                <div :style="[currentPage === index ? {color:'red'} : {color:'gray'}]" class="li-number">{{item.num}}</div>
              </li>
            </ul>

            <!-- <ul class="sticky-header-right" v-if="currentPage === 1">
              <li class="sticky-header-right-left">共567期</li>
              <li class="sticky-header-right-center">
                <i class="iconfont"></i>
                <span>排序</span>
              </li>
              <li class="sticky-header-right-right">
                <i class="iconfont icontuozhuai"></i>
                <span>多选</span>
              </li>
            </ul> -->
          </cube-sticky-ele>

          <cube-slide
            :data="objs"
            :initialIndex="currentPage"
            :loop="false"
            :autoPlay="false"
            :threshold="0.1"
            :showDots = 'false'
            :options="Options"
            @scroll="scroll"
            @change="slideChange">
            
            <cube-slide-item :index="0" >
              <home-page 
              :currentPage="currentPage"
              :djRadio="djRadio" 
              @taggleIndex="taggleIndex"
              ></home-page>
            </cube-slide-item>

            <cube-slide-item :index="1">
              <program-list 
              ref="toScroll" 
              :id="id" 
              :currentPage="currentPage" 
              :loading="loading"
              @more="moreOpera"
              @getcount="getcount"
              ></program-list>
            </cube-slide-item>

          </cube-slide>


        </cube-scroll>
      </cube-sticky>
    </div>

    <share-dialog ref="shareShow"></share-dialog>
    <radio-tips :item="iTem" ref="showMore" @share="toShare"></radio-tips>
  </div>
</template>

<script>
    import myHeader from '../header'
    import myMessage from './message'
    import homePage from './detail'
    import programList from './program'
    import radioTips from '../../common/radiotips'
    import shareDialog from '../../common/sharedialog'

    export default {
      name: 'radio.vue',
      components: {
        myHeader,
        myMessage,
        homePage,
        programList,
        radioTips,
        shareDialog
      },
      data () {
        return {
          title: '电台',
          isShow: true,
          scrollEvents: ['scroll', 'scroll-end'],
          scrollY: 0,
          activeClass: 'nav-item-active',
          currentPage: 0,
          objs: [
            {
              text: '详情',
              num: ''
            },
            {
              text: '节目',
              num: ''
            }
          ],
          djRadio: {},
          userMessage: {},
          profile: {},
          level: 0,
          messTop: 0,
          hasMore: true,
          lasttime: -1,
          scrollYs: {
            leftY: 0,
            rightY: 0
          },
          Options: {
            listenScroll: true,
            probeType: 3
            // stopPropagation:true
          },
          id: '',
          iTem: {},
          count: 0,
          loading: false,
          isFirstEnter: false
        }
      },
      created () {
        // this.getRadio()
        this.isFirstEnter = true
      },
      computed: {
        options () {
          if (this.scrollY < 221) {
            return {
              pullUpLoad: false,
              scrollbar: true,
              click: false, // 解决点击事件被触发两次的问题
              stopPropagation: false,
              scrollX: false,
              scrollY: true
            }
          } else {
            return {
              pullUpLoad: false,
              scrollbar: true,
              click: false, // 解决点击事件被触发两次的问题
              stopPropagation: false,
              scrollX: false,
              scrollY: true
            }
          }
        }
      },
      methods: {
        getRadio () {
          this.id = this.$route.params.id
          // this.userId = this.$route.params.userId
          this.$api.radios.detail(this.id).then(res => {
            this.djRadio = res.data.djRadio
          })
        },
        scrollHandler ({ y }) {
          this.scrollY = -y

          this.messTop = this.$refs.messTop.getBoundingClientRect().top
                // console.log(this.messTop)
          if (this.messTop <= 150) {
            this.title = this.djRadio.name
          } else {
            this.title = '电台'
          }

          if (this.messTop > 280) {
                  // this.$refs.bgEnlarge.style.height = '100%'
            let scale = 1 + ((this.messTop - 280) / 320)
            this.$refs.Enlarge.style['transform'] = `scaleX(${scale})`
            this.$refs.bgEnlarge.style.height = 320 + this.messTop - 280 + 'px'
          } else {
            this.$refs.bgEnlarge.style.height = '320px'
                  // this.$refs.Enlarge.style['transform'].scale = 1
          }
        },
        scrollEndHandler ({ y }) {
    
        },
        toggles (index) {
          this.currentPage = index
        },
        slideChange (index) {
          this.currentPage = index
        },
        scroll ({x}) {
        },
        onPullingUp () {
        },
        taggleIndex () {
          this.currentPage = 1
        },
        issub (type) {
          if (type) {
            this.djRadio.subed = true
            this.djRadio.subCount++
          } else {
            this.djRadio.subed = false
            this.djRadio.subCount--
          }
        },
        moreOpera (item) {
          this.iTem = item
          this.$refs.showMore.show()
        },
        cancelShare () {

        },
        toShare () {
          this.$refs.shareShow.show()
        },
        getcount (count) {
          this.count = count
          this.objs[1].num = count
        }
      },
      beforeRouteEnter (to, from, next) {
        if (from.name === 'djcomment') {
            // to.meta.keepAlive = true
            // console.log('缓存本组件')
          to.meta.isBack = true
        } else {
            // to.meta.keepAlive = false
          to.meta.isBack = false
            // this.loading = true
        }
        next()
      },
      //  beforeRouteLeave(to,from,next){
      //   if(to.name == 'djcomment'){
      //       from.meta.keepAlive = true
      //       // console.log('缓存本组件')
      //       to.meta.isBack = true
      //   }else{
      //       to.meta.keepAlive = false
      //       to.meta.isBack = false
      //       // this.loading = true
      //   }
      //   next()
      // },
      // beforeRouteUpdate (to, from, next) {
      //    if(from.name == 'djcomment'){
      //      to.meta.keepAlive = true
      //   }else{
      //       // to.meta.keepAlive = false
      //       to.meta.keepAlive = false
      //       // this.loading = true
      //   }
      //   next()
      // },
      activated () {
        if (!this.$route.meta.isBack || this.isFirstEnter) {
          this.djRadio = {}
          this.getRadio()
          if (this.currentPage === 1) {
            this.$refs.toScroll.parget()
              // this.$refs.toScroll.scrollTo(0,0,300)
              // this.loadData = false
          }
            // this.$refs.toScroll.parget()
          console.log('更新数据')
            // 滚动位置重置
          this.$nextTick(() => {
              // this.$refs.Scroll.scrollTo(0,0,300)
          })
            // this.$refs.toScroll.scrollTo(0,0,300)
        } else {
            // this.$route.meta.isBack = false
        }
        this.$route.meta.isBack = false
        this.isFirstEnter = false
      }
      // beforeRouteLeave(to,from,next){
      //   if(from.name == 'djcomment'){
      //       to.meta.keepAlive = true
      //       console.log('缓存本组件')
      //   }else{
      //       to.meta.keepAlive = false
      //   }
      //   next()
      // }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
 .radio
    // overflow: hidden
    width:375px
    height:667px
  .my-header
    background-color:transparent !important
    color:white
  .user-background
    position: absolute
    width: 100%
    height:310px
    top:0
    left:0
    z-index: 0
    opacity:1
    filter:brightness(.6) //调整背景暗度
    -webkit-filter:brightness(.6)//兼容不同浏览器
    -o-filter:brightness(.6)
    -moz-filter:brightness(.6)
    overflow: hidden //避免图片放大影响整体布局
    img
      width: 100%
      height: 100%

  .sticky-view-container
    position: absolute
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    z-index:1
    font-size:$font-size-medium
    border-top-left-radius:20px
    border-top-right-radius:20px
    padding-bottom:10px
    .header-content
      background-color:white
      border-top-left-radius:20px
      border-top-right-radius:20px
    .sticky-header
      flex-between()
      height:40px
      background-color:white
      position:relative
      border-top-left-radius:20px
      border-top-right-radius:20px
      border-bottom:1px solid rgba(128,128,128,.4)
      li:nth-child(1)
        margin-left:70px
      li:nth-last-child(1)
        margin-right:70px  
      li
        min-width:40px
        height:40px
        text-align:center
        line-height:40px
        display:flex
        .li-text
          width:40px
          height:40px
          // border-bottom:2px solid red
          margin-top:-2px
        .li-num
          font-size:$font-size-small 
          margin-left:0   
    .sticky-header-right
      background-color:rgba(128,128,128,.5)
      height:30px
      line-height:30px
      flex-between()
      position: relative
      .sticky-header-right-left
        margin-left:10px
      .sticky-header-right-center
        margin-left:10px
        position:absolute
        right:80px
      .sticky-header-right-right
        margin-right:10px  

  .cube-slide
    background-color:white

  .nav-item-active
    border-bottom:2px solid red 
    color: red


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
    height:100%
    position: absolute
    top:0
    left:0
    bottom:0
    z-index: 10000
    // flex-center()
    background-color:white
    div
      position:absolute
      top:100px
      left:150px
      .load
        font-size:$font-size-medium-x 
        i
          color:red
        span
          color:gray        

</style>
