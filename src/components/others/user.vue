<template>
  <div class="user"> 
    <my-header :profile="profile" :isShow="isShow" class="my-header" ref="myHeader"></my-header>
    <div class="user-background" ref="bgEnlarge">
      <img width="100%" height="100%" :src="profile.backgroundUrl" alt="" ref="Enlarge">
    </div>
    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">

        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          @scroll-end="scrollEndHandler"
          @pulling-up="onPullingUp"
          :options="options"
          ref="scroll"
          class="scroll-ele"
        >
          <my-message :userMessage="userMessage" ref="myMessage"></my-message>

          <cube-sticky-ele>
            <ul class="sticky-header" ref="messTop">
              <li :index="0" @click="toggles(0)" class="li-one" :class="[currentPage === 0 ? activeClass : '', errorClass]">
                <div>
                  <span> 主页 </span>
                </div>
              </li>

              <li :index="1" @click="toggles(1)" class="li-two" :class="[currentPage === 1 ? activeClass : '', errorClass]">
                <div>
                  <span> 动态 </span>
                </div>
              </li>
              <li class="li-three">
                <span :style="[currentPage === 1 ? {color:'red'} : {color:'gray'}]" class="nav-number">{{profile.eventCount}}</span>
              </li>
            </ul>
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
            <cube-slide-item :index="0">
              <home-page :userMessage="userMessage"></home-page>
            </cube-slide-item>

            <cube-slide-item :index="1">
              <user-dynamic :profile="profile" ref="userDynamic" @Lasttime="Lasttime"></user-dynamic>
            </cube-slide-item>

          </cube-slide>


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
  </div>
</template>

<script>
    import myHeader from './header'
    import myMessage from './message'
    import playList from './playlist'
    import homePage from './homepage'
    import userDynamic from './userdynamic'
    export default {
      name: 'user.vue',
      components: {
        myHeader,
        myMessage,
        playList,
        homePage,
        userDynamic
      },
      data () {
        return {
          title: '',
          isShow: true,
          scrollEvents: ['scroll', 'scroll-end'],
          scrollY: 0,
          activeClass: 'nav-item-active',
          errorClass: '',
          numberColor: 'nav-number',
          currentPage: 1,
          objs: [
            {
              text: '主页'
            },
            {
              text: '动态'
            }
          ],
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
          }

        }
      },
      created () {
        this.getUser()
      },
      computed: {
        options () {
          if (this.currentPage === 0) {
            return {
              pullUpLoad: false,
              scrollbar: true,
              click: false // 解决触发两次点击事件的bug
            }
          } else {
            return {
              pullUpLoad: true,
              scrollbar: true,
              click: false // 解决触发两次点击事件的bug
            }
          }
        }
      },
      methods: {
        getUser () {
          // this.$route.params.userId
          this.$api.users.userdetail(this.$route.params.userId).then(res => {
            this.userMessage = res.data
            this.profile = res.data.profile
            this.level = res.data.level
            // this.hasMore = res.data.more
            console.log(this.userMessage)
            this.taggleIndex()
          })
        },
        scrollHandler ({ y }) {
          this.scrollY = -y
                // console.log(this.scrollY)
          this.messTop = this.$refs.messTop.getBoundingClientRect().top
                // console.log(this.messTop)
          if (this.messTop <= 112) {
            let opac = 1 - (this.messTop - 62) * 0.02
            this.$refs.myHeader.opacityHeader(opac)
          } else {
            this.$refs.myHeader.opacityHeader(0)
          }
          if (this.messTop < 279) {
            let opac = (this.messTop - 69) * 0.005
            this.$refs.myMessage.opacityHeader(opac)
          } else {
            this.$refs.myMessage.opacityHeader(1)
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

          if (this.scrollY < 230) {
            // if(this.scrollYs.leftY > 230 && this.scrollYs.rightY < 230) {
            //   this.scrollYs.rightY = 230
            // }

            // if(this.scrollYs.rightY > 230 && this.scrollYs.leftY < 230) {
            //   this.scrollYs.leftY = 230
            // }

            // if(this.scrollYs.leftY < 230 && this.scrollYs.rightY < 230) {
            //   this.scrollYs.leftY = this.scrollY
            //   this.scrollYs.rightY = this.scrollY
            // }
            this.scrollYs.leftY = this.scrollY
            this.scrollYs.rightY = this.scrollY
          } else {
            if (this.currentPage === 0) {
              this.scrollYs.leftY = this.scrollY
            } else {
              this.scrollYs.rightY = this.scrollY
            }
          }
        },
        scrollEndHandler ({ y }) {
          // console.log(-y)
          // if(-y <230) return
          // if(this.currentPage === 0) {
          //   this.scrollYs.leftY = -y
          // }else {
          //   this.scrollYs.rightY = -y
          // }
          // console.log(this.scrollYs)
        },
        toggles (index) {
          this.currentPage = index
        },
        slideChange (index) {
          this.currentPage = index
          if (this.currentPage === 0) {
            this.$refs.scroll.scrollTo(0, -this.scrollYs.leftY, 150)
          } else {
            this.$refs.scroll.scrollTo(0, -this.scrollYs.rightY, 150)
          }
          // this.$refs.scroll.scrollTo(0,0,100)
        },
        scroll ({x}) {
          // console.log(-x)
          // if(-x > 370) {
          //   this.$refs.scroll.scrollTo(0,-this.scrollYs.rightY,10)
          // }else if(-x < 10) {
          //   this.$refs.scroll.scrollTo(0,-this.scrollYs.leftY,10)
          // }
        },
        Lasttime (time, more) {
          this.lasttime = time
          this.hasMore = more
          // console.log(this.hasMore)
          // console.log(this.lasttime)
        },
        onPullingUp () {
          if (this.hasMore) {
            this.$refs.scroll.forceUpdate()
            setTimeout(() => {
              this.$refs.userDynamic.getDynamic(this.profile.userId, 10, this.lasttime)
              this.$refs.scroll.forceUpdate()
            }, 1000)
          }
        },
        taggleIndex () {
          if (this.profile.userId === 477726475) {
            this.currentPage = 0
          }
        }
      }
      // mounted() {
      //   this.$nextTick(() => {
      //     this.taggleIndex()
      //   })
      // }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
 .user
    overflow: hidden
    width:375px
    height:667px
  .my-header
    background-color:transparent !important
    color:white
  .user-background
    position: absolute
    width: 100%
    height:320px
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
      // height: 320px
      height: 100%

  .sticky-view-container
    position: absolute
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    z-index:1
    font-size:$font-size-medium
    // background-color:white
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
      li
        width:40px
        height:40px
        text-align:center
        line-height:40px
      .li-one
        margin-left:100px
      .li-two
        margin-right:100px
      .li-three
        position:absolute
        right:70px
        width:auto
        line-height:3
        .nav-number
          font-size:$font-size-small


  .cube-slide
    background-color:white

  .nav-item-active
    color: red
    border-bottom:1.5px solid red


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

</style>
