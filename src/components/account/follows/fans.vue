<template>
  <div class="wrapper">
    <my-header class="header">
    <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
    <div slot="center" class="follow">粉丝</div>
    <i class="iconfont iconbofangzhuangtaizanting" slot="right" @click="music"></i>
    </my-header>


    <div class="pullloadtop" v-if="!followeds.length">
      <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
    </div>

    <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        >
        <div class="content">
          <ul class="follow-list">
            <li v-for="item in followeds" :key="item.userId" @click="toUser(item.userId)">
              <follow-base class="my-follow">
                <img v-lazy="item.avatarUrl" alt="" slot="left" class="img"> 
                <div slot="top" class="my-follow-center-top" v-if="item.signature">
                  <div :class="[isUser ? 'max-length-name' : 'max-length-name-other']">{{item.nickname}}</div>
                  <div class="sea" v-if="item.gender !== 0">
                    <i class="iconfont iconnv" v-if="item.gender === 2"></i>
                    <i class="iconfont iconnan" v-if="item.gender === 1"></i>
                  </div>
                </div>
                <div slot="bottom" :class="[isUser ? 'max-length-desc' : 'max-length-desc-other']" v-if="item.signature">{{item.signature}}</div>
                <div slot="liRight" v-if="!item.signature" class="my-follow-center-top">
                  <div :class="[isUser ? 'max-length-name' : 'max-length-name-other']">{{item.nickname}}</div>
                  <div class="sea" v-if="item.gender !== 0">
                    <i class="iconfont iconnv" v-if="item.gender === 2"></i>
                    <i class="iconfont iconnan" v-if="item.gender === 1"></i>
                  </div>
                </div>

                <div slot="rightFollow" @click.stop="toFollow(item.userId)">
                  <div v-if="item.followed" class="my-follow-true">
                    <i class="iconfont iconhuaban"></i>
                    <span>已关注</span>
                  </div>
                  <div v-else class="my-follow-false">
                    <i class="iconfont iconjia"></i>
                    <span>关注</span>
                  </div>
                </div>
                 <i slot="rightShare" class="iconfont icongengduo" v-if="isUser" @click.stop="toMore"></i>
              </follow-base>
            </li>
          </ul>
        </div>
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
    </div>
  </div>
</template>

<script>
import MyHeader from '../../../base/navbar/navbar'
import followBase from '../../../base/swiper/followbasesmall'
export default {
  components: {
    MyHeader,
    followBase
  },
  props: {},
  data () {
    return {
      isUser: false,
      isFollow: false,
      followeds: [],
      userId: 477726475,
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false // 解决点击事件被触发两次的问题
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      pullDownY: 0,
      offset: 0,
      hasMore: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    toBack () {
      this.$router.go(-1)
    },
    music () {},
    getFolloweds (uid) {
      this.$api.users.userFans(uid).then(res => {
        this.hasMore = res.data.more
        // if (this.hasMore) {
        //   // this.offset += 30
        // }
        //  this.followeds = this.followeds.concat(res.data.followeds)
        this.followeds = res.data.followeds
      })
    },
    isUserOr () {
      return this.isUser = this.userId === 477726475
    },
    onPullingUp () {
      if (!this.hasMore) {
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      } else {
        setTimeout(() => {
          this.getFolloweds(477726475)
          const contentScroll = this.$refs.contentScroll
          contentScroll.forceUpdate()
        }, 1000)
      }
    },
    scrollHandler (pos) {
      this.pullDownY = -pos.y
    },
    toUser (userId) {
      this.$router.push({
        path: `/user/${userId}`
      })
    },
    toMore () {

    },
    toFollow (userId) {
      this.$api.users.toFollow(userId, 1).then(res => {
        console.log(res.data)
      })
    },
    toSingerList () {
      this.$router.push({
        path: `followsinger/${this.userId}`
      })
    }
  },
  created () {
    this.isUserOr()
    this.getFolloweds(477726475)
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .wrapper
    height:100%
    width:100%
    background-color:white !important
    .header
      background-color:white 
      .follow
        font-size:$font-size-large
      i
        font-size:$font-size-large-x + 4
    .follow-singer
      margin:10px
      height:50px
      background-color:rgba(128,128,128,.3)
      border-radius:25px
      flex-between()
      position:relative
      .follow-singer-left
        background-color:red
        border-radius:50%
        width:35px
        height:35px
        flex-center()
        margin-left:5px
        i 
          font-size:$font-size-large+2
          color:white
      .follow-singer-center
        font-size:$font-size-medium-x
        position:absolute
        left:50px
      .follow-singer-right
        margin-right:10px
        color:gray
        i 
          font-size:$font-size-medium-x
    .follow-list
      margin:10px auto 20px 
      li
        height:50px
        width:100%
        margin-bottom:10px
        .my-follow      
          .img
            height:100%
            width:100%
            border-radius:50%
          .my-follow-center-top
            display:flex  
            .sea
              margin-left:5px
              i 
               font-size:$font-size-small
              .iconnv
                color:red 
              .iconnan
                color:#00bfff
            .max-length-name
              max-width:150px
              ellipsis()  
            .max-length-name-other
              max-width:185px
              ellipsis() 
          .max-length-desc
            max-width:200px
            ellipsis()  
          .max-length-desc-other  
            max-width:210px
            ellipsis() 
          .my-follow-false
            height:25px
            width:65px
            border:1px solid red  
            border-radius:20px
            flex-center()
            color:red
            margin-top:12.5px
            margin-left:17.5px
          .my-follow-true
            height:20px
            width:60px
            border:1px solid gray
            border-radius:20px
            flex-center()
            color:gray
            margin-top:15px
            margin-left:15px 
            font-size:$font-size-small 
      
  .content-scroll-wrapper
    position:absolute
    height:567px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:50px
    background-color:white 
    .content
      height: 100%
      overflow: hidden      


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

</style>