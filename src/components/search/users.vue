<template>
  <div class="wrapper">
    <div class="pullloadtop" v-if="!userprofiles.length">
      <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
    </div>

    <div class="content-scroll-wrapper" v-else>
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        >
        <ul class="content">
         <li v-for="(item,index) in userprofiles" :key="index" @click.stop="toUser(item.userId, item.userType)">
            <follow-base class="my-users-base">
              <img v-lazy="item.avatarUrl" alt="" slot="left" class="img"> 
              <div slot="top" v-if="item.signature" class="limit">
               <div class="limit-top">{{item.nickname}}</div>
               <i class="iconfont iconnv" v-if="item.gender === 2"></i>
               <i class="iconfont iconnan" v-if="item.gender === 1"></i>
              </div>
              <div slot="bottom" v-if="item.signature" class="limit">
               <div class="limit-bottom"> {{item.signature}}</div>
              </div>
              <div slot="liRight" v-if="!item.signature" class="limit">
                <div class="limit-top">{{item.nickname}}</div>
                <i class="iconfont iconnv" v-if="item.gender === 2"></i>
                <i class="iconfont iconnan" v-if="item.gender === 1"></i>
              </div>
              <div slot="rightFollow" class="right-follow" v-if="!item.followed" @click.stop="toFollow(item.userId, index)">
                <i class="iconfont iconjia"></i>
                <span>关注</span>
              </div>
              <div slot="rightFollow" class="right-followed" v-if="item.followed">
                <i class="iconfont iconshoucangchenggong"></i>
                <span>已关注</span>
              </div>
            </follow-base>
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
    </div>
  </div>
</template>

<script>
import followBase from '../../base/swiper/followbasesmall'
export default {
  components: {
    followBase
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
        click: false // 解决点击事件被触发两次的问题
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      pullDownY: 0,
      hasMore: true,
      songCount:'',
      offset:0,
      count:0,
      userprofiles:[]
    }
  },
  watch: {
    currentPage(val) {
      if(val === 9 && !this.userprofiles.length) {
        this.getUsers(this.value, 30, 0, 1002)
      } 
    }
  },
  computed: {},
  methods: {
    getUsers (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.hasMore = this.count < res.data.result.userprofileCount
        if(this.hasMore) {
          this.count+=30
          this.offset+=10
        }
        this.userprofiles =  this.userprofiles.concat(res.data.result.userprofiles)
      })
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    onPullingUp () {
      if(!this.hasMore) return
      setTimeout(() => {
        this.getUsers(this.value, 30, this.offset, 1002)
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      }, 1000)
    },
    toFollow (userId, index) {
      this.$api.users.toFollow(userId, 1).then(res => {
        if(res.data.code === 200) {
          this.userprofiles[index].followed = true
        }
      })
    },
    toUser (userId, userType) {
      if(userType === 2 || userType === 4) {
        this.$api.users.userdetail(userId).then(res => {
          let id = res.data.profile.artistId
          this.$router.push({
            path: `/singer/${userId}/${id}`
          })
        })
      }else {
        this.$router.push({
        path: `/user/${userId}`
      })
      }
    },
  },
  created() {
    // this.getUsers(this.value, 30, 0, 1002)
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:100%
    width:100%
    background-color:white
    margin-top:22px
    // margin-bottom:50px
    .content
      li
        margin:10px auto
        .my-users-base
          img  
            height:50px
            width:50px
            border-radius:50%
          .limit
            display:flex
            .limit-top
              max-width:158px
              ellipsis()  
              margin-right:15px
            .limit-bottom
              max-width:220px
              ellipsis()  
            i
              font-size:$font-size-small 
            .iconnv
              color:pink
            .iconnan
              color:blue
          .right-follow
            height:22px
            width:62px
            border:1px solid red
            border-radius:11px
            flex-center()
            font-size:$font-size-small
            color:red
          .right-followed
            height:22px
            width:62px
            border:1px solid gray
            border-radius:11px
            flex-center()
            font-size:$font-size-small
            color:gray  
      
  .content-scroll-wrapper
    position:absolute
    height:567px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:20px
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