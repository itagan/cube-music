<template>
<!-- <transition name="cube-action-sheet-fade"> -->
  <!-- <div class="ring-dialog-view"> -->
    <cube-popup ref="popup" @mask-click.stop="hide" :z-index="2001" v-show="isVisible">
      <transition name="cube-action-sheet-fade">

      <div class="ring-dialog-wrapper" v-show="isVisible">
        <div class="triangle-top" v-if="diaTop"></div>
        <div class="triangle-bottom" v-if="!diaTop"></div>
        <ul class="ring-dialog-container">
          <li @click.stop="Reply">
            <i class="iconfont iconhuifu"></i>
            <span>回复</span>
          </li>
          <li @click.stop="toShare">
            <i class="iconfont iconfenxiang"></i>
            <span>分享</span>
          </li>
          <li>
            <i class="iconfont iconfuzhi"></i>
            <span>复制</span>
          </li>
          <li>
            <i class="iconfont iconjubao"></i>
            <span>举报</span>
          </li>
        </ul>
      </div>
      </transition>
    </cube-popup>
  <!-- </div> -->
   <!-- </transition> -->
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      diaTop: false,
      isVisible: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    show () {
      // this.$refs.popup.show()
      this.isVisible = true
    },
    hide () {
      // this.$refs.popup.hide()
      this.isVisible = false
    },
    diaTopChange () {
      this.diaTop = true
    },
    _diaTopChange () {
      this.diaTop = false
    },
    Reply () {
      // 回复
      this.$emit('reply')
      this.hide()
    },
    toShare () {
      // 回复
      this.$emit('share')
      this.hide()
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
// .ring-dialog-view
//   height 100%
//   width:100%
  .ring-dialog-wrapper
    position: relative
    min-width: 50px
    margin: 0 
    height:50px
    .ring-dialog-container
      box-sizing: border-box
      width:auto
      height:50px
      font-size:$font-size-medium
      display:flex
      background-color:#25262d
      opacity:83%
      color:white
      border-radius:5px
      margin:5px
      li
        height:50px
        width:50px
        display:flex
        justify-content:center
        flex-direction:column
        i 
         height:50%
         width:50px
         flex-center()
        span 
         height:50%
         width:50px 
         flex-center()
      li:nth-child(2) 
        margin-left:5px
      li:nth-child(3) 
        margin-left:5px     
    .triangle-top
      width: 0
      height: 0
      border: 10px solid
      border-color: transparent transparent #25262d 
      opacity:83% 
      position:absolute
      top:-20px
      left:50%
      margin-left:-5px

    .triangle-bottom
      width: 0
      height: 0
      border: 10px solid
      border-color: #25262d transparent transparent transparent
      opacity:83% 
      position:absolute
      bottom:-20px
      left:50%
      margin-left:-5px  

// .ring-dialog-view >>>
.cube-popup >>>
  .cube-popup-mask 
    background-color:transparent

.cube-action-sheet-fade-enter, .cube-action-sheet-fade-leave-active
  opacity: 0
.cube-action-sheet-fade-enter-active, .cube-action-sheet-fade-leave-active
  transition: all .2s ease-in-out

</style>