<template>
  <div class="new-comment">
    <div class="new">
      最新评论
      <span>{{total}}</span>
    </div>
    <ul class="new-ul">
      <li v-for="(item, index) in comments" :key="item.commentId" class="new-li" @click="Reply(index)" ref="liOffset">
        <base-comment :item="item" :hasReplyArr="hasReplyArr"></base-comment>
      </li>
    </ul>
  </div> 
</template>
<script>
    import BaseComment from '../../base/basecomment/basecomment'
    export default {
      name: 'newComment.vue',
      components: {
        BaseComment
      },
      data () {
        return {
          comments: [],
          item: {},
          total: '',
          hasReplyArr: []
        }
      },
      props: {
        detail: {
          type: Object,
          default: {}
        },
        limits: {
          type: Number,
          default: 20
        }
      },
      created () {
        this.getNewComment()
      },
      watch: {
            // 监控父组件传递过来的vid变化则重新渲染新相关推荐数据
        detail () {
          this.getNewComment()
        },
        limits () {
                // limits改变则调用方法请求数据
          this.Limits()
        }
      },
      methods: {
        getNewComment () {
          this.$api.video.newcomment(this.detail.vid, this.limits).then(res => {
            this.comments = res.data.comments
            this.total = res.data.total
            this.hasReplyArr = this.comments.filter(item => {
              return item.parentCommentId !== 0
            })
          })
        },
        Limits () {
          setTimeout(() => {
            this.getNewComment()
            let newPage = this.comments.slice(this.limits, this.limits + 10)
                // 可能由于API的限制，上拉加载也就是连续请求十几次之后，默认limit参数变成20~~数据将被重置
            if (this.limits >= this.comments.length + 11) {
                        // 如果没有新数据
                        // 告诉父组件不要显示加载中等操作
              this.$emit('Limits', false)
            } else if (newPage) {
                        // 如果有新数据
                        // 获取新数据并渲染出来
              this.comments = this.comments.concat(newPage)
              this.$emit('Limits', true)
            }
          }, 1000)
        },
        Reply (index) {
          let proup = document.getElementsByClassName('cube-popup-content')[0],
            liTop = this.$refs.liOffset[index].getBoundingClientRect().top,
            Hei = this.$refs.liOffset[index].offsetHeight
          if (liTop < 350) {
            let _liTop = liTop + Hei
            proup.style.top = -(667 - _liTop - 30) + 'px'
          } else {
            proup.style.top = -(667 - liTop + 30) + 'px'
          }
          let user = this.comments[index].user.nickname,
            commentId = this.comments[index].commentId,
            threadId = this.threadId
          this.$emit('showDialog', liTop, user, commentId, threadId)
        }
    
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .new-comment
    margin-top:40px
    margin-bottom:2px
    position:relative
    bottom:40px
    .new
      height:35px
      line-height:35px
      background-color:white
      border-top:1px solid #dcdcdc
      span
        font-size:$font-size-small-s
        color:gray
    .new-li
      margin-bottom:1px
</style>
