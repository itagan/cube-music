<template>
  <div class="user"> 

   <div class="pullloadtop" v-if="!userMessage">
     <div>
        <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
     </div>
    </div>

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
          <my-message :profile="profile" :level="level" ref="myMessage"></my-message>

          <cube-sticky-ele>
            <ul class="sticky-header" ref="messTop">
               <li v-for="(item, index) in objs" :key="item.text">
                <div :index="index" @click="toggles(index)" class="li-text" :class="[currentPage === index ? activeClass : '']"> {{item.text}} </div>
                <div :style="[currentPage === index ? {color:'red'} : {color:'gray'}]" class="li-number">{{item.num}}</div>
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
              <home-page 
              :id="id" 
              :userId="userId"
              :begin="begin" 
              :currentPage="currentPage"
              :profile="profile" 
              :userMessage="userMessage"
              ref="toScroll" 
              @taggleIndex="taggleIndex"
              ></home-page>
            </cube-slide-item>

            <cube-slide-item :index="1">
              <play-list :id="id" ref="toScroll" :begin="beginOne" :currentPage="currentPage"></play-list>
              <!-- <div style="height:600px">测试啦啦啦啦啦</div> -->
            </cube-slide-item>

            <cube-slide-item :index="2">
             <my-album :id="id" @albumNum="albumNum"></my-album> 
            </cube-slide-item>

             <cube-slide-item :index="3">
             <my-video :id="id" @videoNum="videoNum"></my-video>
            </cube-slide-item>

             <cube-slide-item :index="4">
              <my-dynamic :profile="profile" @dynamicNum="dynamicNum"></my-dynamic>
            </cube-slide-item>

          </cube-slide>


        </cube-scroll>
      </cube-sticky>
    </div>
  </div>
</template>

<script>
    import myHeader from './header'
    import myMessage from './message'
    import playList from './music'
    import homePage from './homepage'
    import userDynamic from './dynamic'
    import myAlbum from './album'
    import myVideo from './video'
    import myDynamic from './dynamic'

    export default {
      name: 'user.vue',
      components: {
        myHeader,
        myMessage,
        playList,
        homePage,
        userDynamic,
        myAlbum,
        myVideo,
        myDynamic
      },
      data () {
        return {
          title: '',
          isShow: true,
          scrollEvents: ['scroll','scroll-end'],
          scrollY: 0,
          activeClass: 'nav-item-active',
          currentPage: 0,
          objs: [
            {
              text: '主页',
              num:''
            },
            {
              text: '歌曲',
              num:''
            },
            {
              text: '专辑',
              num:'22'
            },
            {
              text: '视频',
              num:'33'
            },
            {
              text: '动态',
              num:'2'
            }
          ],
          userMessage:{},
          profile: {},
          level: 0,
          messTop: 0,
          hasMore:true,
          lasttime:-1,
          scrollYs:{
            leftY:0,
            rightY:0
          },
          Options: {
            listenScroll: true,
            probeType: 3,
            // stopPropagation:true
          },
          id:'',
          userId:'',
          begin:false,
          beginOne:false

        }
      },
      created () {
        this.getUser()
      },
      computed: {
        options () {
          if(this.scrollY < 221) {
            return {
              pullUpLoad: false,
              scrollbar: true,
              click: false, // 解决点击事件被触发两次的问题
              stopPropagation:false,
              scrollX:false,
              scrollY:true
            }
          }else{
            return {
              pullUpLoad: false,
              scrollbar: true,
              click: false, // 解决点击事件被触发两次的问题
              stopPropagation:false,
              scrollX:false,
              scrollY:false
            }
          }
        }
      },
      methods: {
        getUser () {
          this.id = this.$route.params.id     
          this.userId = this.$route.params.userId
          this.$api.users.userdetail(this.$route.params.userId).then(res => {
            this.userMessage = res.data
            this.profile = res.data.profile
            this.level = res.data.level
            console.log(this.profile)
          })
        },
        scrollHandler ({ y }) {
          this.scrollY = -y
          console.log(this.scrollY)
                // console.log(this.scrollY)
          // this.$refs.toScroll.Enable()
          if(this.scrollY >= 221) {
            // this.$refs.toScroll.Enable()
            // this.$refs.scroll.forceUpdate()
            // console.log('开启子组件滚动')
            if( this.currentPage === 0) {
              this.begin = true
            }else if(this.currentPage === 1) {
              this.beginOne = true
            }
           
          }
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
        Lasttime (time, more) {
          this.lasttime = time
          this.hasMore = more
          // console.log(this.hasMore)
          // console.log(this.lasttime)
        },
        onPullingUp () {
        },
        albumNum (num) {
          this.objs[2].num = num
        },
        videoNum (num) {
          this.objs[3].num = num
        },
        dynamicNum (num) {
          this.objs[4].num = num
        },
        taggleIndex () {
          this.currentPage = 1
        }
      }
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
      li:nth-child(1)
        margin-left:15px
      li:nth-last-child(1)
        margin-right:15px  
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
        .li-num
          font-size:$font-size-small 
          margin-left:0   


  .cube-slide
    background-color:white

  .nav-item-active
    color: red
    border-bottom:2px solid red


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
