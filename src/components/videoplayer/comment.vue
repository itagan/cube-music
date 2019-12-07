<template>
  <div class="hot-comment">
    <div class="hot">精彩评论</div>
    <ul>
      <li v-for="item in comments" class="hot-li">
        <base-comment :item="item"></base-comment>
      </li>
    </ul>
    <div class="all" v-if="showAllHot">
      <div class="all-hot-comment" @click="allHotComment">
        <span>全部精彩评论</span>
        <i class="iconfont iconzan1"></i>
      </div>
    </div>
  </div>
</template>

<script>
    import BaseComment from '../../base/basecomment/basecomment'
    import {mapMutations} from 'vuex'
    import {timestampOther} from '../../assets/js/timestamp'
    export default {
      name: 'comment.vue',
      components: {
        BaseComment
      },
      data () {
        return {
          comments: [],
          item: {},
          showAllHot: false
        }
      },
      props: {
        detail: {
          type: Object,
          default: {}
        }
      },
      created () {
        this.getHotComment()
      },
      watch: {
            // 监控父组件传递过来的vid变化则重新渲染新相关推荐数据
        detail () {
          this.getHotComment()
        }
      },
      methods: {
        getHotComment () {
          this.$api.video.hotcomment(this.detail.vid).then(res => {
            if (res.data.hotComments.length >= 15) {
              this.showAllHot = true
              this.comments = res.data.hotComments.slice(0, 15)
              for (let i = 0; i < 15; i++) {
                this.comments[i].time = timestampOther(this.comments[i].time)
              }
            } else {
              this.comments = res.data.hotComments
                    // 不足15个精彩评论的全部显示
              for (let i = 0; i < this.comments.length; i++) {
                this.comments[i].time = timestampOther(this.comments[i].time)
              }
            }
          })
        },
        allHotComment () {
                // 向父组件发送消息，显示全部精彩评论覆盖掉其它
          this.$emit('allHot')
            // 把vuex的数据还原
          this.setHotLimit(20)
        },

        ...mapMutations({
          setHotLimit: 'SET_HOT_LIMIT'
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .hot-comment
    margin-top:10px
    z-index:100
    .hot
      height:35px
      line-height:35px
      background-color:white
    .hot-li
      margin-bottom:1px
    .all
      background-color:white
      flex-center()
      padding-top:1px
      .all-hot-comment
        border:1px solid gray
        height:25px
        width:120px
        border-radius:15px
        flex-center()
        margin:10px auto
        span
          margin-right:5px
</style>
