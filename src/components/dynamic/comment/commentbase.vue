<template>
    <ul class="comment">
      <li class="comment-header" v-if="hotComments.length">精彩评论
        <span>{{hotComments.length}}</span>
      </li>
      <li v-for="item in hotComments" :key="item.commentId">
        <base-comment :item="item" class="base-comment"></base-comment>
      </li>
      <li class="comment-header">最新评论 
        <span>{{newComments.length}}</span>
        </li>
      <li v-for="(item,index) in newComments" :key="item.commentId" @click="Reply(index)" ref="liOffset">
        <base-comment :item="item" class="base-comment"></base-comment>
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
      hotComments:[]
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
      this.$emit('showDialog',liTop)
    }
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