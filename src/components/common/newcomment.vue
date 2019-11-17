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
                total:'',
                // limits:20
            }
        },
        props: {
            detail: {
                type: Object,
                default: {}
            },
            limits:{
                type: Number,
                default: 20
            }
        },
        created() {
            this.getNewcomment()
        },
        watch: {
            //监控父组件传递过来的vid变化则重新渲染新相关推荐数据
            detail() {
                this.getNewcomment();
            },
            limits() {
                //limits改变则调用方法请求数据
                this.Limits();
            }
        },
        methods: {
            getNewcomment() {
                this.$api.video.newcomment(this.detail.vid,this.limits).then(res => {
                    this.comments = res.data.comments;
                    this.total = res.data.total;
                    for (let i = 0; i < this.comments.length; i++) {
                        this.comments[i].time = timestampother(this.comments[i].time);
                    }
                })
            },
            Limits() {
                setTimeout(() => {
                    // this.comments = [];// 清空数据，以防重复渲染
                    this.getNewcomment();
                    let newPage = this.comments.slice(this.limits,this.limits+10);
                    // if (newPage) {
                    //     // 如果有新数据
                    //     //获取新数据并渲染出来
                    //     console.log('还有数据');
                    //     this.comments = this.comments.concat(newPage);
                    //     this.$emit('Limits',true);
                    // } else if(this.limits >= this.comments.length){
                    //     console.log('没数据了');
                    //     // 如果没有新数据
                    //     //告诉父组件不要显示加载中等操作
                    //     this.$emit('Limits',false);
                    // }

                    //可能由于API的限制，上拉加载也就是连续请求十几次之后，默认limit参数变成20~~数据将被重置
                    console.log(this.limits);
                    console.log(this.comments.length);

                    if (this.limits >= this.comments.length+11) {
                        // 如果没有新数据
                        //告诉父组件不要显示加载中等操作
                        this.$emit('Limits',false);

                    } else if(newPage){
                        // 如果有新数据
                        //获取新数据并渲染出来
                        console.log('还有数据');
                        this.comments = this.comments.concat(newPage);
                        this.$emit('Limits',true);
                    }
                }, 1000);
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .newcomment
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
    .newli
      margin-bottom:1px
</style>
