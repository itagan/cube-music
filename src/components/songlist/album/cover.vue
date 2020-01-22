<template>
  <div class="wrapper" @click="cancel">
    <my-header class="header">
      <div  slot="right" class="cancel-top">
        <i class="iconfont icondel2" @click="cancel"></i>
      </div>
    </my-header>
    <div class="background">
      <img width="100%" height="100%" :src="messages.blurPicUrl" alt="">
    </div>
    
    <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options">
          <ul class="content">
            <li class="content-img">
              <div class="content-img-wrap">
                <img :src="messages.picUrl" alt="">
              </div>
              <div class="album-cir"></div>
            </li>
            <li class="content-title">
              {{messages.name}}
            </li>
            <li class="content-line">
              
            </li>
            <li class="content-company" v-if="messages.company">
              发行公司: {{messages.company}}
            </li>
            <li class="content-type" v-if="messages.subType">
              专辑类别: {{messages.subType}} 
            </li>
            <li class="content-desc" v-if="messages.description">
              {{messages.description}} 
            </li>
            <li class="content-desc" v-if="!messages.description">
              暂无描述
            </li>
          </ul>
      </cube-scroll>
    </div>

    <div class="footer">
      <div class="footer-text">
        <span @click.stop="saveCover">保存封面</span>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '../../../base/navbar/navbar'
export default {
  components: {
    MyHeader
  },
  props: {
    messages: {
        type: Object,
        default: {}
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
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  
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
        width:100px
        border:1px solid rgba(248,248,255,1)
        border-radius:10px
        flex-center()
        font-size:$font-size-medium
        color:white
        margin-bottom:10px

    .scroll-list-wrap
      height:567px  
      position:relative
      top:50px
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
          .album-cir
            position:absolute
            border-radius:50%
            width:185px
            height:185px
            background-color:black
            z-index:-1
            top:-15px   
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
        .content-company
          // width:100%
          margin-top:30px
          padding:0 10px
          height:auto
          line-height:1.5 
        .content-type  
          padding:0 10px
          height:auto
          line-height:1.5  
          margin-top:5px 
        .content-desc
          padding:0 10px
          height:auto
          line-height:1.5 
          margin-top:10px  
          white-space: normal
         

</style>