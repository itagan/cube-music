<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner" ref="enLarge">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn" ref="btnEnlarge"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { prefixStyle } from '../../assets/js/dom.js'
  const progressBtnWidth = 2
  const transform = prefixStyle('transform')
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      progressTouchStart (e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
        this.$emit('percentChanging', this._getPercent())
        this.$refs.enLarge.style.height = '3px'
        this.$refs.btnEnlarge.classList.add('progress-btn-active')
      },
      progressTouchEnd () {
        this.touch.initiated = false
        this._triggerPercent()
        this.$refs.enLarge.style.height = '2px'
        this.$refs.btnEnlarge.classList.remove('progress-btn-active')
      },
      progressClick (e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
        // this._offset(e.offsetX)
        this._triggerPercent()
      },
      setProgressOffset (percent) {
        if (percent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = percent * barWidth
          this._offset(offsetWidth)
        }
      },
      _triggerPercent () {
        this.$emit('percentChange', this._getPercent())
      },
      _offset (offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      },
      _getPercent () {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        return this.$refs.progress.clientWidth / barWidth
      }
    },
    watch: {
      percent (newPercent) {
        this.setProgressOffset(newPercent)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 2px
      background: rgba(255,255,255, 0.2)
      .progress
        position: absolute
        height: 100%
        background: gray
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 10px
          left: 8px
          box-sizing: border-box
          width: 8px
          height: 8px
          // border: 3px solid white
          border-radius: 50%
          background: white
        .progress-btn-active
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          // border: 3px solid $color-text
          border-radius: 50%
          background: white
</style>