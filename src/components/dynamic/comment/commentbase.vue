<template>
    <ul class="comment">
      <li class="comment-header" v-if="hotComments.length">精彩评论
        <span>{{hotComments.length}}</span>
      </li>
      <li v-for="_item in hotComments" :key="_item.commentId">
        <base-comment :item="_item" :hasReplyArr="hasReplyArrHot" class="base-comment"></base-comment>
      </li>
      <li class="comment-header">最新评论 
        <span>{{newComments.length}}</span>
        </li>
      <li v-for="(_item, index) in newComments" :key="_item.commentId" @click="Reply(index)" ref="liOffset">
        <base-comment :item="_item" class="base-comment" :hasReplyArr="hasReplyArr"></base-comment>
      </li>
      <li class="no-comment" v-if="!newComments.length">还没有评论</li>
    </ul>
</template>

<script>
import baseComment from '../../../base/basecomment/basecomment'
import replyDialog from '../../common/replydialog'
export default {
  components: {
    baseComment,
    replyDialog
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      newComments: [],
      hotComments:[],
      _item:{},
      arr:[],
      hasReplyArr:[],
      hasReplyArrHot:[]
    }
  },
  watch: {
    item () {
        this.getComment()
      }
  },
  computed: {},
  methods: {
    getComment () {
      this.threadId = this.item.info.threadId
      this.$api.users.dynamicComment(this.threadId).then(res => {
        this.newComments = res.data.comments
        this.hotComments = res.data.hotComments
        // this.showReply()
        // console.log(this.newComments)
        this.hasReplyArr = this.newComments.filter(item => {
        return item.parentCommentId !== 0
        }) 


        this.hasReplyArrHot = this.hotComments.filter(item => {
        return item.parentCommentId !== 0
        }) 
        // console.log(this.hasReplyArr)
      })
    },
    Reply (index) {
      let proup = document.getElementsByClassName('cube-popup-content')[0],
      liTop = this.$refs.liOffset[index].getBoundingClientRect().top,
      Hei = this.$refs.liOffset[index].offsetHeight
      if(liTop < 144){
        let _liTop = liTop + Hei
        proup.style.top = -(667 - _liTop - 30) + 'px'
      }else {
        proup.style.top = -(667 - liTop+30) + 'px'
      }
      let user = this.newComments[index].user.nickname,
          commentId = this.newComments[index].commentId,
          threadId = this.threadId
      this.$emit('showDialog',liTop,user,commentId,threadId)
    },
    // showReply () {
    //   for(let i =0; i < this.newComments.length;i++) {
    //     if(this.newComments[i].beReplied.length) {
    //       this.arr.push(this.newComments[i].beReplied[0].beRepliedCommentId)
    //     }
    //   }
    //   this.arr = [...new Set(this.arr)] 
    //   //  console.log(this.arr)
    // },
  },
  created () {
    this.getComment()
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .comment
    width:375px
    height:auto
    .comment-header
      height:40px
      padding-left:15px
      line-height:40px
      background-color:white
      span 
       color:gray
       font-size:$font-size-small
    li
     height:auto
     margin:auto 10px
     font-size:$font-size-medium
    .no-comment
      text-align:center
      margin-top:50px
      color:gray 
</style>