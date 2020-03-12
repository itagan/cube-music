<template>
<transition name="cube-action-sheet-fade">
    <cube-popup ref="popup" :zIndex="2001" v-show="isVisible">
    <transition name="cube-action-sheet-move">
      <div class="ring-dialog-wrapper" v-show="isVisible">
        <div class="ring-dialog-container">
          <div class="title">
            <ul>
              <li>
                <div class="icon-footer"><i class="iconfont iconnetease"></i></div>
                <div class="icon-text">网易云音乐</div>
              </li>
              <li class="add"><i class="iconfont iconjia"></i></li>
              <li>
                <div class="icon-footer"><i class="iconfont icondiantai"></i></div>
                <div class="icon-text">库乐队</div>
              </li>
            </ul>
          </div>
          <div class="content">
            <div class="content-text">
              由于苹果系统限制，手机更换铃声需要安装"库乐队"APP后即可使用
            </div>
            <cube-button class="button" @click="hide">前往App Store 下载</cube-button>
          </div>
        </div>
        <div class="close" @click="hide"><i class="cubeic-close"></i></div>
        </div>
       </transition>
    </cube-popup>
    </transition>
</template>

<script>
    export default {
      name: 'subscribe-dialog',
      data () {
        return {
          isVisible: false
        }
      },
      methods: {
        show () {
          this.isVisible = true
        },
        hide () {
          this.isVisible = false
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .ring-dialog-wrapper
    position: relative
    max-width: 360px
    margin: 0 25px
    height:300px
    .ring-dialog-container
      box-sizing: border-box
      width:250px
      height:250px
      font-size:$font-size-small
      .title
        background-color:rgba(138,43,226,1)
        width:100%
        height:120px
        flex-center()
        border-top-left-radius:10px
        border-top-right-radius:10px
        ul
          width:150px
          height:70px
          flex-between()
          .add
            flex-center()
            font-size:$font-size-large-x
            padding-bottom:10px
          li
            height:70px
            width:70px

            .icon-footer
              height:50px
              width:50px
              border-radius:8px
              background-color:red
              color:white
              flex-center()
              margin-left:10px
              i
                font-size:30px
            .icon-text
              height:20px
              width:70px
              text-align:center
              margin-top:5px
              color:gray
      .content
        height:120px
        width:100%
        background-color:white
        position: relative
        border-bottom-left-radius:10px
        border-bottom-right-radius:10px
        .content-text
          width:200px
          margin-left:20px
          padding-top:15px
          height:40px
          line-height:1.5

        .button
          display: inline-block
          width: 230px
          border-radius: 20px
          font-size: 15px
          background-color: red
          position: absolute
          bottom:10px
          left:10px
          height:36px
          padding:0

    .close
      height:25px
      width:25px
      border-radius:50%
      background-color:ragb(0,0,0,.6)
      position: absolute
      bottom:5px
      left:50%
      margin-left:-12.5px
      border:1px solid white
      font-size:$font-size-large
      color:white
      flex-center()


.cube-action-sheet-fade-enter, .cube-action-sheet-fade-leave-active
  opacity: 0
.cube-action-sheet-fade-enter-active, .cube-action-sheet-fade-leave-active
  transition: all .3s ease-in-out

.cube-action-sheet-move-enter, .cube-action-sheet-move-leave-to
  transform: scale3d(0, 0, 0)
.cube-action-sheet-move-leave, .cube-action-sheet-move-enter-to 
    transform: scale3d(1, 1, 1)
.cube-action-sheet-move-enter-active, .cube-action-sheet-move-leave-active
  transition: all .3s ease-in-out  
</style>
