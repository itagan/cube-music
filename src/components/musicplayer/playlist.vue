<template>
  <div class="mask" v-if="showList" @click.self="cancel">
     <cube-slide
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.1"
        :showDots = 'false'
        @change="slideChange">
        
        <cube-slide-item :index="0" >
          <div class="list">
            <div class="list-top">
              上次播放
            </div>
            <ul class="list-top-mode">
              <li>
                歌单:
                <span>一周上新</span>
              </li>
            </ul>
            <div class="scroll-list-wrap" ref="increaseHeight">
              <cube-scroll
                ref="scroll"
                :options="options"
                :scroll-events="scrollEvents"
                >
              <ul class="list-center">
                  <li v-for="(item,index) in playlist" :key="index" class="li" @click.stop="toCheckMusic(item, index)"> 
                    <base-auto class="my-songs-base">
                      <i slot="left" class="iconfont iconlaba"  v-if="index === currentIndex"></i>
                      <div class="list-center-li-left" slot="liRight">
                        <span>红玫瑰</span>
                        -
                        <span>陈奕迅</span>
                      </div>
                      <div slot="rightFollow">
                        播放来源
                      </div>
                      <i slot="rightShare" class="iconfont icon-ellipsis"></i>
                    </base-auto>
                  </li>
                </ul>
              </cube-scroll>
            </div>
            <div class="list-bottom-close" @click="close">关闭</div>
          </div>
        </cube-slide-item>

        <cube-slide-item :index="1">
          <div class="list">
            <div class="list-top">
              当前播放
              <span>(4)</span>
            </div>
            <ul class="list-top-mode">
              <li class="list-top-mode-left">
                <i class="iconfont icongengxin"></i>
                <span>列表循环</span>
              </li>
               <li class="list-top-mode-right"> 
                <div class="list-top-mode-right-all">
                  <i class="iconfont iconziyuan1"></i>
                  <span>收藏全部</span>
                </div>
                <div class="list-top-mode-right-line"></div>
                <i class="iconfont icon3"></i>
              </li>
            </ul>
            <div class="scroll-list-wrap" ref="increaseHeight">
              <cube-scroll
                ref="scroll"
                :options="options"
                :scroll-events="scrollEvents"
                >
              <ul class="list-center-ul">
                  <li v-for="(item,index) in playlist" :key="index" class="list-center-li" @click.stop="toCheckMusic(item, index)"> 
                    <base-auto class="my-songs-base">
                      <i slot="left" class="iconfont iconlaba" style="color:red" v-if="index === currentIndex"></i>
                      <div class="list-center-li-left" slot="liRight">
                        <div class="list-center-li-left-name" :class="index === currentIndex ? activeClass : ''">
                          {{item.name}}-
                          <span class="list-center-li-left-ar">{{Trans(item.artists || item.ar)}}</span>
                        </div>
                      </div>
                      <div slot="rightFollow" class="list-center-li-right" v-if="index === currentIndex">
                        <div class="list-center-li-right-play">播放来源</div>
                      </div>
                      <div slot="rightShare" class="list-center-li-right-close"><i class="iconfont icondel2"></i></div>
                    </base-auto>
                  </li>
                </ul>
              </cube-scroll>
            </div>
            <div class="list-bottom-close" @click="close">关闭</div>
          </div>
        </cube-slide-item>
      </cube-slide>
  </div>
</template>

<script>
import baseAuto from '../../base/swiper/baseauto'

export default {
  components: {
    baseAuto,
  },
  props: {
    playlist:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      currentPage: 1,
      showList:false,
      options: {
        scrollbar: true
      },
      scrollY: 0,
      scrollEvents: ['scroll'],
      currentIndex:-1,
      activeClass:'active-class'
    }
  },
  watch: {},
  computed: {},
  methods: {
    toggles (index) {
      this.currentPage = index
    },
    slideChange (index) {
      this.currentPage = index
    },
    show () {
      this.showList = true
    },
    hide () {
      this.showList = false
    },
    cancel () {
      this.hide()
    },
    close () {
      this.hide ()
    },
    toCheckMusic(item,index) {
      this.currentIndex = index
    },
    Trans (alias) {
      let arr = []
      for(let i = 0; i < alias.length; i++) {
        arr.push(alias[i].name)
      }
      return arr.join('/')
    },
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .mask
    width:100%
    height:100%
    background-color:gray
    ///*opacity:0.5*/ 会被子div继承从而把它也透明了
    background: rgba(0, 0, 0, 0.5)
    z-index:2001 //遮罩层需要更高
    position:fixed
    top:0
    bottom:0
    left:0
    right:0
    .cube-slide
      width:100%
      height:500px
      background-color:none
      font-size:$font-size-medium
      position:absolute
      bottom:10px
      // border-top-left-radius:15px
      // border-top-right-radius:15px
      .cube-slide-item
        // border-radius:15px
        // width:90%
        .list
          border-radius:15px
          background-color:white
          height:auto
          margin:10px 
          border-bottom-left-radius:15px   
          .list-top
            font-size:$font-size-medium-x
            font-weight: bold
            height:40px
            line-height:40px
            padding-left:10px
            span 
              color:gray
              font-size:$font-size-small
          .list-top-mode   
            flex-between()
            height:30px
            .list-top-mode-left
              margin-left:15px
              flex-vertical()
              i 
                font-size:$font-size-large
                margin-right:5px
            .list-top-mode-right
              margin-right:15px
              flex-vertical()
              .list-top-mode-right-all
                margin-right:10px
                i 
                  margin-right:5px
              .list-top-mode-right-line
                height:15px
                width:1px
                background-color:rgba(128,128,128,.2)
                margin-right:15px  
                margin-top:5px

          .scroll-list-wrap
            height:360px
            .list-center-ul
              height:auto
              .list-center-li
                flex-between()
                height:45px
                border-bottom:1px solid rgba(128,128,128,.2)
                .list-center-li-left
                  flex-vertical()
                  .list-center-li-left-name
                    ellipsis()
                    max-width:300px
                    .list-center-li-left-ar
                      color:gray
                      font-size:$font-size-small
                  .active-class
                    ellipsis()
                    max-width:200px  
                    color:red
                    .list-center-li-left-ar
                      color:gray
                      font-size:$font-size-small
                .list-center-li-right
                  .list-center-li-right-play
                    flex-center()
                    border:1px solid rgba(128,128,128,.6)
                    height:20px
                    width:60px
                    border-radius:10px
                    font-size:$font-size-small
                .list-center-li-right-close >>>   
                  i
                    font-size:$font-size-large-x    
                    color:gray

          .list-bottom-close
            height:50px
            border-top: 1px solid rgba(128,128,128,.2)
            flex-center()
</style>