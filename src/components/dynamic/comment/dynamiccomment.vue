<template>
<!-- <router-view> -->
  <div class="forward-comment"> 
    <my-header :profile="profile" class="my-header" ref="myHeader"></my-header>
    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">

        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          :options="options"
          ref="scroll"
          class="scroll-ele"
        >
          <dynamic-content style="height:auto" ref="messTop"></dynamic-content>

          <cube-sticky-ele>
            <ul class="sticky-header">
              <li>
                <div :index="0" @click="toggles(0)" :class="[currentPage === 0 ? activeClass : '', errorClass]">
                  <span> 评论 </span>
                </div>
                <span :style="[currentPage === 0 ? {color:'red'} : {color:'gray'}]" v-show="commentShow">{{commentCount}}</span>
              </li>
            

              <li>
                <div :index="0" @click="toggles(1)" :class="[currentPage === 1 ? activeClass : '', errorClass]">
                  <span> 转发 </span>
                </div>
                <span :style="[currentPage === 1 ? {color:'red'} : {color:'gray'}]" v-show="forwardShow">{{forwardCount}}</span>
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
             <comment-base :item="item" @showDialog="showDialog"></comment-base>
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
      <input type="text" :placeholder="placeholder" ref="Input" v-model="value" @input="input">
      <div class="comment-icon">
        <i class="iconfont iconzan1" :style="[isLike === true ? {color:'red'} : {color:''}]" @click="toLike"></i>
        <i class="iconfont iconpinglun" @click="Forward"></i>
      </div>
    </div>

    <reply-dialog ref="showDia" @reply="replyComment"></reply-dialog>
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
    import replyDialog from '../../common/replydialog'
    import {mapGetters} from 'vuex'
    export default {
      name: 'user.vue',
      components: {
        myHeader,
        dynamicContent,
        myComment,
        commentBase,
        forwardUser,
        likeUser,
        replyDialog
    
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
          likedCount:0,
          commentShow:true,
          commentCount:0,
          forwardShow:true,
          forwardCount:0,
          placeholder:"发表评论",
          user:"",
          commentId:-1,
          threadId:'',
          value:''
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
          this.messTop = this.$refs.messTop.getTop()
          // console.log(this.scrollY)
          if(this.messTop >= 25) {
          this.$refs.myHeader._show()
            let opac = 1 - (55 - this.messTop) * 0.034
            this.$refs.myHeader.opacityHeader(opac)
          }
          else if(this.messTop >= 0){
            let opac = 1 - this.messTop * 0.04
            this.$refs.myHeader.opacityHeader(opac)
            this.$refs.myHeader.show()
          }else {
            this.$refs.myHeader.show()
            this.$refs.myHeader.opacityHeader(1)
          }
          // this.commentHeader = this.$refs.commentHeader.getBoundingClientRect().top
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
          this.forwardCount = this.item.insiteForwardCount
          this.commentCount = this.item.info.commentCount
          this.forwardShow = this.forwardCount ? true : false
          this.commentShow = this.commentCount ? true : false
          this.likeShow = this.likedCount ? true : false
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
        },
        showDialog (liTop,user,commentId,threadId) {
          this.$refs.showDia.show()
          if(liTop < 144){
            this.$refs.showDia.diaTopChange()
          }else {
            this.$refs.showDia._diaTopChange()
          }
          this.user = user
          this.threadId = threadId
          this.commentId = commentId
          // console.log(user,commentId,threadId)
        },
        replyComment () {
          this.placeholder = '回复' + this.user + ':'
          this.Input()
        },
        Input () {
          this.$refs.Input.focus()
        },
        replyUser () {
          this.$api.commentFeature.dynamicReply(threadId, commentId, content).then(res => {
            console.log(res)
          })
        },
        input () {
          console.log(this.value.length)
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
    height:667px
    overflow-y:hidden
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


  

  .comment-bottom
      position:fixed
      bottom:0
      height:45px
      width:100%
      background-color:white
      z-index:2001
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

  .cube-slide
    margin-bottom:50px    
    min-height:515px   

  .nav-item-active
    color: red
    border-bottom:1.5px solid red

</style>
