<template>
  <div class="base-comment" v-if="!item.beReplied.length">
    <div class="base-comment-top">
      <img v-lazy="item.user.avatarUrl" @click.stop="toUser(item.user.userId, item.user.userType)" v-if="item.user">
      <div class="base-comment-time">
        <div class="base-comment-name" v-if="item.user">
          <div class="user-name">{{item.user.nickname}}</div>
          <div class="user-author" v-if="this.author[0].userId === item.user.userId"><div class="user-author-name">作者</div></div>
        </div>
        <span class="user-time">{{timestamp(item.time)}}</span>
      </div>
      <div class="user-praise" @click.stop="toLike" :style="[item.likedCount.length > 0 ? {color:'red'} : {color:''}]">
        <!-- v-bind:class="[itme.liked === true ? active : error]" -->
        <span ref="likeCount" v-show="item.likedCount > 0">{{item.likedCount}}</span>
        <i class="iconfont iconzan1"></i>
      </div>
    </div>
    <div class="base-comment-bottom">
      <span class="comment">{{item.content}}</span>
      <div v-if="item.beReplied.length" class="be-replied">
        <div class="line"></div>
        <div class="be-replied-content">
          <span class="be-replied-name">@{{item.beReplied[0].user.nickname}}</span>
            {{item.beReplied[0].content}}
        </div>
      </div>
      <div class="reply" @click.stop="reply" v-if="ReplyNum(item) !== -1 ? true : false">
        <span>{{_ReplyNum(item).length}}条回复</span>
        <i class="iconfont iconiconfontyoujiantou"></i>
      </div>

      <!-- <div class="reply" @click="reply" v-if="show !== -1 ? true : false">
         <span>{{_ReplyNum(item).length}}条回复</span>
        <i class="iconfont iconiconfontyoujiantou"></i>
      </div> -->
    </div>
  </div> 
</template>

<script>
import {mapGetters} from 'vuex'
import {timestampOther} from '../../assets/js/timestamp'
  export default {
    name: 'baseComment.vue',
    props: {
      item: {
        type: Object,
        default: {}
      },
      hasReplyArr: {
        type: Array,
        default: []
      },
      // show: {
      //   type:Number,
      //   default:-1
      // },
      // ReplyCount: {
      //   type:Number,
      //   default:0
      // }
      isdynamic: {
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        replyShow: false,
        showOr:-1,
        // hasReplyArr:[],
        ReplyArr:[],
        isLike: true,
        active:'activeColor',
        error:''
      }
    },
    created() {
      // this.showReply()
    },
    computed:{
       ...mapGetters([
        'author',
        'dynamic'
      ])
    },
    watch:{},
    methods: {
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
      toLike () {
        // this.$api.likes.commentDynamic(this.item.commentId, this.dynamic[0].info.threadId, 1).then(res => {
        //   console.log(res)
        //   if(res.status === 200) {
        //     this.$refs.likeCount.innerHTML++
        //   }
        // })
      },
      reply () {
        if(this.isdynamic) {
           this.$router.push({
            path: 'commentreply', 
            name:'commentreply',
            query: { 
              item:JSON.stringify(this.ReplyArr),  //传参获取参数都使用json方法转换，避免刷新时候报错
              _item:JSON.stringify(this.item),
              threadId:this.dynamic[0].info.threadId
            }
          })   
        }else {
          this.$router.push({
            path: 'commentreply', 
            name:'commentreply',
            query: { 
              item:JSON.stringify(this.ReplyArr),  //传参获取参数都使用json方法转换，避免刷新时候报错
              _item:JSON.stringify(this.item),
            }
          })   
        }
        

        console.log(this.item)
      },
      // 方法分开写，v-if去重数组 避免出现可能无限循环报错
      ReplyNum (item) {
        return [...new Set(this.hasReplyArr.slice())].findIndex(ele => {
          return item.commentId === ele.parentCommentId
        })
      },
      _ReplyNum (item) {
        item =  {...item}
        if(item.beReplied.length !== 0) return
        this.ReplyArr = this.hasReplyArr.slice().filter(ele => {
          return item.commentId === ele.parentCommentId
        })
        // for(let i = 0; i<this.hasReplyArr.length;i++) {
        //   if(item.commentId === this.hasReplyArr[i].parentCommentId) {
        //     this.ReplyArr.push(item)
        //   }
        // }
        console.log(this.ReplyArr)
        return this.ReplyArr
      },
      timestamp (time) {
        return timestampOther(time)
      },
      // isShow (id) {
      //   return id === this.author[0].userId
      // }
      // showReply (item) {
      //   if(item.commentId) {
      //     return this.arr.findIndex(num => {
      //     return num === item.commentId
      //     })
      //   }
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .base-comment
    width:100%
    position:relative
    background-color:white
    /*padding-bottom:5px*/
    .base-comment-top
      flex-between()
      height:35px
      position:relative
      img
        height:30px
        width:30px
        border-radius:50%

        /*position:relative*/
        /*top:50%*/
      .base-comment-time
        flex-center(column)
        align-items: flex-start
        position:absolute
        left:40px
        .base-comment-name
          display:flex
          .user-name
            font-size:$font-size-small
            color:gray
            margin-bottom:3px
            margin-right:5px
          .user-author
            width:auto
            background-color:#ff6eb4
            color:#ffc1c1
            border-radius:3px
            height:auto
            padding:2px 3px
            flex-center()
            .user-author-name  
              flex-center()
              width:100%
              height:100%
              text-align:center
              font-size:$font-size-small 
              -webkit-transform-origin-x: 0
              -webkit-transform: scale(0.80)
              transform: scale(0.80)
              margin-left:3px
        .user-time
          font-size:$font-size-small
          color:#dcdcdc
          margin-top:2px
          // font-size:12px; 
          -webkit-transform-origin-x: 0
          -webkit-transform: scale(0.80)
      .user-praise
        font-size:$font-size-small-s
        height:100%
        color:gray
        flex-center()
        span
          margin-right:3px
    .base-comment-bottom
      /*position:relative*/
      /*left:40px*///不用定位方式避免被整体拉到左边出现水平滚动条
      font-size:$font-size-small
      margin-top:5px
      margin-left:40px //改用外边距
      padding-bottom:5px
      border-bottom:1px solid #dcdcdc
      .comment
        /*position:relative*/
        /*right:40px*/
        line-height:1.5
        white-space: normal
        width:100%
        display:inline-block
      .be-replied
        color: gray
        display:flex
        padding-bottom:10px
        margin-top:10px
        .line
          width:4px
          min-height:10px  //让旁边内容撑开高度。设置最小避免不出现
          background-color: #cdcdcd
          margin-right:5px
        .be-replied-content
          line-height:1.5
          white-space: normal
          .be-replied-name
            color:dodgerblue
      .reply
        color:#4A8FCD
        height:30px
        display:flex
        line-height:30px
        span
          margin-right:5px
          display:flex
          width:auto
        i 
          font-size:$font-size-large-x
          margin-left:-7px


  .activeColor
    color:red

</style>
