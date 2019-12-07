<template>
  <div class="new-comment">
    <div class="new">
      最新评论
      <span>{{total}}</span>
    </div>
    <ul class="new-ul">
      <li v-for="item in comments" class="new-li">
        <base-comment :item="item"></base-comment>
      </li>
    </ul>
  </div>
</template>
<script>
    import BaseComment from '../../base/basecomment/basecomment'
    import {timestampOther} from '../../assets/js/timestamp'

    export default {
      name: 'newComment.vue',
      components: {
        BaseComment
      },
      data () {
        return {
          comments: [],
          item: {},
          total: ''
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
            for (let i = 0; i < this.comments.length; i++) {
              this.comments[i].time = timestampOther(this.comments[i].time)
            }
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
