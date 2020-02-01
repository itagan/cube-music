<template>
  <div class="wrapper" @click="cancel">
    <my-header class="header">
      <div  slot="right" class="cancel-top">
        <i class="iconfont icondel2" @click="cancel"></i>
      </div>
    </my-header>
    <div class="background">
      <img width="100%" height="100%" :src="playlist.coverImgUrl" alt="" v-if="playlist && playlist.coverImgUrl">
    </div>
    
    <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options">
          <ul class="content">
            <li class="content-img">
              <div class="content-img-wrap">
                <img :src="playlist.coverImgUrl" alt=""  v-if="playlist && playlist.coverImgUrl">
              </div>
            </li>
            <li class="content-title" v-if="playlist && playlist.name">
              {{playlist.name}}
            </li>
            <li class="content-line">
            </li>
            <li class="content-label">
              <ul v-if="playlist && playlist.tags && playlist.tags.length">
                <li class="content-label-one">
                  标签:
                </li>
                <li class="content-label-text" v-for="item in playlist.tags" :key="item"> 
                  {{item}}
                </li>
              </ul>
              <ul v-else>
                <li class="content-label-one">
                  标签: 无
                </li>
              </ul>
            </li>
            <li class="content-desc" v-if="playlist && playlist.description">
              {{playlist.description}} 
            </li>
            <li class="content-desc" v-else>
              暂无描述
            </li>
          </ul>
      </cube-scroll>
    </div>

     <div class="footer-user" v-if=" playlist && playlist.creator.userId === 477726475">
      <div class="footer-text">
        <span @click.stop="toEdit">编辑</span>
      </div>
      
      <div class="footer-text">
        <span @click.stop="saveCover">保存封面</span>
      </div>
    </div>

     <div class="footer" v-else>
      <div class="footer-text">
        <span @click.stop="saveCover">保存封面</span>
      </div>
    </div>

  </div>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
export default {
  components: {
    MyHeader
  },
  props: {
    playlist: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      options: {
        scrollbar: true
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    cancel () {
      this.$emit('coverHide')
    },
    saveCover () {
      const toast = this.$createToast({
        txt: '',
        time: 1000,
        zIndex:2001,
        onTimeout: () => {
          const toast = this.$createToast({
            txt: '图片已保存到相册',
            type: 'correct',
            zIndex:2001,
          })
          toast.show()
        }
      })
      toast.show()
    },
    toEdit () {
      this.$router.push({
        path:'/editlist',
        query: {
          playlist: JSON.stringify(this.playlist)
        }
      })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  
  .wrapper
    width: 100%
    height: 100%
    position:relative
    top:0
    bottom:0
    left:0
    right:0
    z-index:2001
    background-color:black
    .header
      background-color:transparent
      z-index:2005
      .cancel-top
        i 
         font-size:$font-size-large-x + 20
         color:white
    .background
      position: absolute
      width: 100%
      height:100%
      top:0
      left:0
      z-index: 0
      opacity:.8
      filter: blur(40px)
      img
        width: 100%
        height: 100%      
    .footer
      height:50px
      width:100%
      background-color:transparent 
      flex-center()  
      position:fixed
      bottom:0
      .footer-text
        height:20px 
        width:90px
        border:1px solid rgba(248,248,255,1)
        border-radius:10px
        flex-center()
        font-size:$font-size-small
        color:white
        margin-bottom:10px
    .footer-user
      height:50px
      width:100%
      background-color:transparent 
      flex-center()  
      position:fixed
      bottom:0
      .footer-text
        height:20px 
        width:90px
        border:1px solid rgba(248,248,255,1)
        border-radius:10px
        flex-center()
        font-size:$font-size-small
        color:white
        margin-bottom:10px  
      div
       margin:0 10px    

    .scroll-list-wrap
      height:567px  
      position:relative
      top:50px
      width:375px
      .content
        height:auto
        font-size:$font-size-medium
        color:white
        .content-img
          margin-top:50px
          width:100%
          height:200px
          position:relative
          flex-center()
          .content-img-wrap
            width:190px
            height:190px
            border-radius:10px
            background-color:white
            img
              width:190px
              height:190px
              border-radius:10px 
        .content-title    
          margin:20px auto
          width:100%
          height:20px
          flex-center()
        .content-line
          width:auto
          height:1.5px
          background-color:gray
          margin:10px
        .content-label
          // width:100%
          margin-top:30px
          padding:0 10px
          height:auto
          ul
            color:white
            display:flex
            flex-wrap:wrap
            li
              margin-right:5px
              margin-top:5px
            .content-label-text
              width:auto
              height:15px
              border-radius:5px
              background-color:rgba(128,128,128,.4)
              font-size:$font-size-small
              flex-center()
              padding:0 3px

              
        .content-desc
          padding:0 10px
          height:auto
          line-height:1.5 
          margin-top:15px  
          white-space: normal
          font-size:$font-size-small
         

</style>