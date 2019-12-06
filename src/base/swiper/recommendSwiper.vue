<template>
  <ul class="swiper">
    <div class="swipertop">相关推荐</div>
    <li v-for="item in recommend" :key="item.vid" class="item" @click="selectItem(item.vid)">
     <div class="img">
        <img :src="item.coverUrl">
        <div class="playtime">
          <i class="iconfont iconzan1"></i>
          <span>{{item.playTime}}</span>
        </div>
      </div>

      <div class="text">
        <h2 class="itemtitle" v-html="item.title"></h2>
        <p class="itemdesc">
          {{item.durationms}}
          by
          {{item.creator[0].userName}}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'

    export default {
      name: 'recommendSwiper.vue',
      data () {
        return {
          recommend: [],
          videourl: ''
        }
      },
      props: {
        detail: {
          type: Object,
          default: {}
        }
      },
      computed: {
        ...mapGetters([
          'currentVid'
        ])
      },
      created () {
        this.getRecommend()
        this.getvVideoUrl()
    },
      watch: {
            // 监控父组件传递过来的vid变化则重新渲染新相关推荐数据
        detail () {
          this.getRecommend()
        }
      },
      methods: {
        getRecommend () {
          this.$api.video.allvideo(this.detail.vid).then(res => {
            this.recommend = res.data.data
            for (let i = 0; i < this.recommend.length; i++) {
              this.recommend[i].playTime = serializeNumber(this.recommend[i].playTime)
              this.recommend[i].durationms = durationms(this.recommend[i].durationms)
            }
          })
        },
            // 获取播放地址
        getvVideoUrl () {
          this.$api.video.videourl(this.detail.vid).then(res => {
            this.videourl = res.data.urls[0].url
          })
        },
        selectItem (vid) {
              // 以下顺序不能变，否则需要点击两次才获取数据刷新。先把vuex数据更改，再派发父组件事件
          this.setPlayvideo(vid)
          // this.setLimit(20);  //重置初始值，避免影响这些组件内容
          this.$emit('select', vid)
            // this.getRecommend();
            // this.reload(); //刷新本页面
          // this.$router.push({
          //     path:`/find`
          // }) //跳转其它页面没事，跳转本页面报错。解决方案交给父组件刷新并重新渲染数据
          this.setCurrentUrl(this.videourl)
        },

        getLength () {
                // 告诉父组件数量
          this.$emit('swipeNum', this.recommend.length)
        },

        ...mapMutations({
          setPlayvideo: 'SET_CURRENT_VID',
          setCurrentUrl: 'SET_CURRENT_URL'

        })
      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .swiper
    margin:5px 0
    background-color:white
    .swipertop
      height:15px
      line-height:15px
    .item
      flex-between()
      height:60px
      margin:10px 0
      .img
        /*margin-right:10px*/
        height:100%
        width:100px
        border-radius:5px
        position: relative
        img
          height:100%
          width:100%
        .playtime
          position:absolute
          top:5px
          right:5px
          font-size:$font-size-small
      .text
        flex:1
        height:100%
        margin-left:15px
        .itemtitle
          font-size:$font-size-medium
          word-break:wrap
          height:40px
          line-height:1.2
          multiline-ellipsis($num=2)
        .itemdesc
          font-size:$font-size-small

</style>
