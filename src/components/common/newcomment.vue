<template>
  <div class="newcomment">
    <div class="new">
      最新评论
      <span>{{total}}</span>
    </div>
    <ul class="newul">
      <li v-for="item in comments" class="newli">
        <base-comment :item="item"></base-comment>
      </li>
    </ul>
  </div>
</template>

<script>
    import BaseComment from "../../base/basecomment/basecomment";
    import {timestampother} from '../../assets/js/timestamp'

    export default {
        name: "newcomment.vue",
        components: {
            BaseComment
        },
        data() {
            return {
                comments: [],
                item: {},
                total:''
            }
        },
        props: {
            detail: {
                type: Object,
                default: {}
            }
        },
        created() {
            this.getHotcomment()
        },
        watch: {
            //监控父组件传递过来的vid变化则重新渲染新相关推荐数据
            detail() {
                this.getHotcomment();
            }
        },
        methods: {
            getHotcomment() {
                this.$api.video.newcomment(this.detail.vid).then(res => {
                    this.comments = res.data.comments;
                    this.total = res.data.total;
                    for (let i = 0; i < this.comments.length; i++) {
                        this.comments[i].time = timestampother(this.comments[i].time);
                    }
                    // console.log(this.comments)
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .newcomment
    margin-top:2px
    margin-bottom:50px
    .new
      height:35px
      line-height:35px
      background-color:white
      span
        font-size:$font-size-small-s
        color:gray
    .newli
      margin-bottom:1px
</style>
