<template>
  <div class="hotcomment">
    <div class="hot">精彩评论</div>
    <ul>
      <li v-for="item in comments" class="hotli">
        <base-comment :item="item"></base-comment>
      </li>
    </ul>
    <div class="all" v-if="showallhot">
      <div class="allhotcomment" @click="allhotcomment">
        <span>全部精彩评论</span>
        <i class="iconfont iconzan1"></i>
      </div>
    </div>
  </div>
</template>

<script>
    import BaseComment from "../../base/basecomment/basecomment";
    // import {mapGetters} from 'vuex'
    import {timestampother} from '../../assets/js/timestamp'
    export default {
        name: "comment.vue",
        components: {
            BaseComment
        },
        data() {
            return {
                comments: [],
                item: {},
                showallhot:false
            }
        },
        props: {
            detail: {
                type: Object,
                default: {}
            }
        },
        // computed: {
        //     ...mapGetters([
        //         'currentVid'
        //     ])
        // },
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
                this.$api.video.hotcomment(this.detail.vid).then(res => {
                    //判断是否显示全部评论按钮
                    if(res.data.hotComments.length >= 15) {
                        this.showallhot = true;
                        this.comments = res.data.hotComments.slice(0,15);
                        // console.log(this.comments)
                        for (let i = 0; i < 15; i++) {
                            this.comments[i].time = timestampother(this.comments[i].time);
                        }
                    }else{
                        this.comments = res.data.hotComments;
                        //不足15个精彩评论的全部显示
                        for (let i = 0; i < this.comments.length; i++) {
                            this.comments[i].time = timestampother(this.comments[i].time);
                        }
                    }
                })
            },
            allhotcomment() {
                //向父组件发送消息，显示全部精彩评论覆盖掉其它
                this.$emit('allhot');
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .hotcomment
    margin-top:10px
    z-index:100
    .hot
      height:35px
      line-height:35px
      background-color:white
    .hotli
      margin-bottom:1px
    .all
      background-color:white
      flex-center()
      padding-top:1px
      .allhotcomment
        border:1px solid gray
        height:25px
        width:120px
        border-radius:15px
        flex-center()
        margin:10px auto
        span
          margin-right:5px
</style>
