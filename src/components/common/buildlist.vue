<template>
 <transition name="cube-action-sheet-fade">
  <div class="mask" @click.self="cancel" v-show="visible">
    <transition name="cube-action-sheet-move">
    <div class="build" v-if="visible">
      <div class="build-top">
        <span @click="cancel">取消</span>
        <span class="title">新建歌单</span>
        <span class="complete" @click="complete">完成</span>
      </div>

      <div class="build-center">
        <cube-input
          v-model="value"
          :clearable="clearable"
          :autofocus="autofocus"
          :placeholder="placeholder"
          @input="input"
          class="my-input"
        ></cube-input>
      </div>

      <div class="build-bottom" @click.stop="privacy">
        <div class="check" :class="this.isPrivacy === 10 ? 'checked' : '' "></div>
        <span>设置为隐私歌单</span>
      </div>
    </div>
     </transition>
    </div>
  </transition>
</template>

<script>
    export default {
      name: 'buildList.vue',
      data () {
        return {
          value: '',
          isPrivacy: '', // 是否隐私歌单
          visible: false,
          placeholder: '歌单标题',
          autofocus: true,
          clearable: {
            visible: true,
            blurHidden: true
          }
        }
      },
      props: {
        track: {
          type: Object,
          default: () => {}
        }
      },
      methods: {
            // 提交创建的歌单
        createList (value, privacy) {
          this.$api.songLists.createlist(value, privacy).then(res => {
            console.log(res)
          })
        },
        input (val) {
          const toast = this.$createToast({
            time: 3000,
            txt: '字数超过限制',
            type: 'error'
          })
            // 输入中
          if (val.length > 0) {
            document.getElementsByClassName('complete')[0].style.color = 'black'
            console.log('黑色')
          } else {
            document.getElementsByClassName('complete')[0].style.color = 'rgba(128,128,128,.5)'
          }

          if (val.length > 20) {
            toast.show()
            val = val.slice(0, 20)
                // 必须下边这样设置才能实现新替换的显示出来！！
            this.$nextTick(() => {
              this.value = val
            })
          }
        },
        show () {
          this.visible = true
        },
        hide () {
          this.visible = false
        },
        cancel (e) {
                // 触摸到遮罩层就取消本组件
          this.$emit('cancel')
          this.value = '' // 清空内容'
          this.hide()
        },
        complete () {
                // 完成创建
          if (this.value) {
            this.isPrivacy === 10 ? this.createList(this.value, 10) : this.createList(this.value, 0)
            this.hide()
          }
        },
        privacy () {
                // 设置为隐私歌单
          if (this.isPrivacy) {
            this.isPrivacy = ''
          } else {
            this.isPrivacy = 10
          }
        }
      },
      mounted () {
        this.$nextTick(() => {
          this.value = this.track && this.track.name
          console.log(this.value)
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .mask
    width:100%
    height:100%
    background-color:gray
    ///*opacity:0.5*/ 会被子div继承从而把它也透明了
    background: rgba(0, 0, 0, 0.5)
    z-index:2001 //遮罩层需要更高
    position:fixed
    top:0
    bottom:0
    left:0
    right:0
    .build
      width:100%
      height:150px
      background-color:white
      /*opacity:1*/
      border-top-left-radius:15px
      border-top-right-radius:15px
      font-size:$font-size-medium
      z-index:1001
      position:absolute
      bottom:0
      .build-top
        height:45px
        width:100%
        margin-left:10px
        flex-between()
        .title
          margin:auto
          color:black
          font-weight:bold
        .complete
          color:rgba(128,128,128,.5)
          margin-right:20px
      .build-center
        width:100%
        height:60px
        margin:auto 10px
        .my-input
          height:100%
          width:auto
          padding-right:15px
        .cube-input::after
          border:none !important  //取消默认样式
        .cube-input_active::after
          border:none !important  //取消默认样式
      .build-bottom
        color:gray
        font-size:$font-size-small
        text-align:left
        margin:auto 10px
        height:30px
        // line-height:45px
        width:100%
        display:flex
        align-items: center
        .check
          height:10px
          width:10px
          border:1px solid rgba(128,128,128,.5) 
          border-radius:50%
          position:relative
          margin-right:5px
        .checked
          height:10px
          width:10px
          border:1px solid red
          border-radius:50%
          position:relative
          background-color:red
        .checked::after
          position: absolute
          top: 1px
          left: 3px
          width: 2px
          height: 5px
          border: 2px solid white
          border-width: 0 1px 1px 0
          content: ''
          transform: rotate(45deg) 

      .cube-popup-content
        display: flex;
        justify-content: space-between;
        align-items: center !important
        .cube-toast-icon
          display:inline-block


.cube-action-sheet-fade-enter, .cube-action-sheet-fade-leave-active
  opacity: 0
.cube-action-sheet-fade-enter-active, .cube-action-sheet-fade-leave-active
  transition: all .3s ease-in-out

.cube-action-sheet-move-enter, .cube-action-sheet-move-leave-active
  transform: translate3d(0, 100%, 0)
.cube-action-sheet-move-enter-active, .cube-action-sheet-move-leave-active
  transition: all .3s ease-in-out 
</style>
