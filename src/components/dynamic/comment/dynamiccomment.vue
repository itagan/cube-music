<template>
<!-- <router-view> -->
  <div class="forward-comment"> 
    <my-header :profile="profile" :isShow="isShow" class="my-header" ref="myHeader"></my-header>
   
    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">

        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          :options="options"
          ref="scroll"
          class="scroll-ele"
        >
          <dynamic-content style="height:auto"></dynamic-content>

          <cube-sticky-ele>
            <ul class="sticky-header" ref="messTop">
              <li>
                <div :index="0" @click="toggles(0)" :class="[currentPage === 0 ? activeClass : '', errorClass]">
                  <span> 评论 </span>
                </div>
                <span :style="[currentPage === 0 ? {color:'red'} : {color:'gray'}]">{{item.info.commentCount}}</span>
              </li>
            

              <li>
                <div :index="0" @click="toggles(1)" :class="[currentPage === 1 ? activeClass : '', errorClass]">
                  <span> 转发 </span>
                </div>
                <span :style="[currentPage === 1 ? {color:'red'} : {color:'gray'}]">{{item.insiteForwardCount}}</span>
              </li>

               <li>
                <div :index="0" @click="toggles(2)" :class="[currentPage === 2 ? activeClass : '', errorClass]">
                  <span> 赞 </span>
                </div>
                <span :style="[currentPage === 2 ? {color:'red'} : {color:'gray'}]" ref="likeNum" v-show="likeShow">{{likedCount}}</span>
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
            @change="slideChange">

            <cube-slide-item :index="0">
              <!-- <div style="height:700px">11111</div> -->
              <!-- <my-Comment></my-Comment> -->

            <!-- <cube-sticky-ele >
              <ul>
                <li>222</li>
              </ul>
            </cube-sticky-ele>
            <div style="height:200px">
              哆啦A梦啦啦啦啦啦啦啦啦啦啦啦
            </div>
            <cube-sticky-ele >
              <ul>
                <li>111</li>
              </ul>
            </cube-sticky-ele>
            <div style="height:600px">
              玩那啦啦啦啦啦
            </div> -->
            
             <!-- <cube-sticky-ele>
             <div class="comment-header">精彩评论</div>
            </cube-sticky-ele> -->

             <div class="comment-header" ref="commentHeader">精彩评论</div>
             <comment-base></comment-base>
             <div class="comment-header">最新评论</div>
             <comment-base></comment-base>
             <comment-base></comment-base>

            </cube-slide-item>

            <cube-slide-item :index="1">
               <forward-user></forward-user>
            </cube-slide-item>

             <cube-slide-item :index="2">
               <like-user :item="item" :isadd="isadd" ref="likeUserChange"> </like-user>
            </cube-slide-item>

          </cube-slide>


        </cube-scroll>
      </cube-sticky>
    </div>
   
    <div class="comment-bottom">
      <input type="text" placeholder="发表评论">
      <div class="comment-icon">
        <i class="iconfont iconzan1" :style="[isLike === true ? {color:'red'} : {color:''}]" @click="toLike"></i>
        <i class="iconfont iconpinglun" @click="Forward"></i>
      </div>
    </div>
  </div>
  <!-- </router-view> -->
</template>

<script>
    import myHeader from './header'
    import dynamicContent from './dynamiccontent'
    import myComment from './comment'
    import commentBase from './commentbase'
    import forwardUser from './forwarduser'
    import likeUser from './likeuser'
    import {mapGetters} from 'vuex'
    export default {
      name: 'user.vue',
      components: {
        myHeader,
        dynamicContent,
        myComment,
        commentBase,
        forwardUser,
        likeUser
    
      },
      data () {
        return {
          title: '',
          isShow: false,
          scrollEvents: ['scroll'],
          scrollY: 0,
          activeClass: 'nav-item-active',
          errorClass: '',
          numberColor: 'nav-number',
          currentPage: 0,
          objs: [
            {
              text: '主页'
            },
            {
              text: '动态'
            },
            {
              text: '赞'
            }
          ],
          profile: {},
          level: 0,
          messTop: 0,
          item: {},
          isLike: false,
          isadd: [],
          likeShow: true,
          likedCount:0
        }
      },
      created () {
        this.getData()
      },
      computed: {
        options () {
          return {
            scrollbar: true,
            click: false // 解决触发两次点击事件的bug
          }
        },
        ...mapGetters([
          'dynamic'
        ]),
        Dynamic () {
          return this.dynamic
        }
    
      },
      methods: {
        scrollHandler ({ y }) {
          this.scrollY = -y
          this.messTop = this.$refs.messTop.getBoundingClientRect().top
                // console.log(this.scrollY)
                //  console.log(this.messTop)

                // if(this.messTop >= 180 && this.messTop <= 199) {
                // this.isShow = false
                //  let opac = 1 - (this.messTop - 180) * 0.05
                //  this.$refs.myHeader.opacityHeader(opac)
                // }else if(this.messTop > 199) {
                //   this.$refs.myHeader.opacityHeader(1)
                //   this.isShow = false
                // }
                // if(this.messTop >= 160 && this.messTop < 180) {
                //  this.isShow = true
                //  let opac = -(this.messTop - 180) * 0.05
                //  this.$refs.myHeader.opacityHeader(opac)
                // }else if(this.messTop < 160) {
                //   this.isShow = true
                //   this.$refs.myHeader.opacityHeader(1)
                // }

          this.commentHeader = this.$refs.commentHeader.getBoundingClientRect().top
                // console.log(this.commentHeader)
          // if (this.commentHeader < 88) {
          //   this.$refs.commentHeader.style.position = 'fixed'
          //         // this.$refs.commentHeader.style.top = `${this.scrollY}` + 'px'
          // } else {
          //   this.$refs.commentHeader.style.position = 'static'
          // }
        },
        toggles (index) {
          this.currentPage = index
        },
        slideChange (index) {
          this.currentPage = index
        },
        getData () {
          this.item = this.dynamic[0]
          this.isLike = this.item.info.liked
          this.likedCount = this.item.info.likedCount
          if(this.likedCount === 0) {
            this.likeShow = false
          }else {
            this.likeShow = true
          }
        },
        toLike () {
          if (this.isLike) {
            this.$api.likes.dynamic(0, this.dynamic[0].info.threadId).then(res => {
              if (res.status && res.status === 200) {
                this.isLike = false
                this.$set(this.isadd,0,'false')
                  // this.$refs.likeUserChange.checkUser() 速度比较慢
                  // this.$refs.likeNum.innerHTML-- 数据不重新渲染
                this.likedCount--
                this.likeShow = true
                if(this.likedCount === 0) {
                  this.likeShow = false
                  console.log("隐藏")
                }
              }
            })
          } else {
            this.$api.likes.dynamic(1, this.dynamic[0].info.threadId).then(res => {
              console.log(res)
              if (res.status && res.status === 200) {
                this.isLike = true
              // this.isadd = true 存在bug
              // this.isadd.push('true') 速度慢
              this.$set(this.isadd,0,'true')
                this.likedCount++
                this.likeShow = true
              }
            })
          }
        },
        Forward () {
          this.uid = 477726475
          this.evId = this.item.id
          console.log('转发')
          this.$router.push({
            path: `/forward/${this.uid}/${this.evId}`
          })
        }
        // handleScroll () {
        //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //   console.log(scrollTop)
        // },
      },
      watch: {
        // Dynamic (dynamic) {
        //   if (dynamic) {
        //     this.getData()
        //   }
        // },
        Dynamic: {
          handler:"getData",
        	immediate:true  //有变化就监控，初始化时候也执行这个方法
        }
        // $router (val) {
        //   if(val) {
        //     console.log('路由变化了')
        //   }
        // }
      },
      mounted () {
        // window.addEventListener('scroll', this.handleScroll)
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
 .forward-comment
    background-color: white
    width:375px
    height:675px
  // .my-header
  //   background-color:transparent !important
  //   color:white
  

  .sticky-view-container
    position: absolute
    top: 55px
    bottom: 0
    left: 0
    width: 100%
    z-index:1
    font-size:$font-size-medium
    .sticky-header
      display:flex
      height:50px
      background-color:white
      border-bottom:.5px solid rgba(128,128,128,.2)
      li
        width:33%
        height:100%
        position:relative
        flex-center()
        div
         width:40px
         height:100%
         text-align:center
         line-height:50px
         color:none
         font-size:$font-size-medium-x
        // span 
        //  color:gray 
        //  font-size:$font-size-small


  .comment-header
    height 40px
    padding-left:15px
    line-height:40px
    background-color:white
    // top:100px

  .comment-bottom
      position:fixed
      bottom:0
      height:45px
      width:100%
      background-color:white
      z-index:2020
      border-top:1px solid #dcdcdc
      font-size:$font-size-medium
      flex-between()
      input
        height 100%
        flex:1
        margin-left:10px
        border: 0
        outline: none
        background-color: rgba(0, 0, 0, 0)
      div
        height: 100%
        width:60px
        display:flex
        font-size:$font-size-large-x
        i
          width:100%
          height:100%
          margin-top:13px
          margin-right:10px

  .nav-item-active
    color: red
    border-bottom:1.5px solid red

</style>
