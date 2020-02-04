<template>
  <div class="radio">
    <div class="radio-wrap">
      <ul class="radio-list" :class="!isPlay ? playing : ''">
        <li class="radio-list-left">
          <div class="radio-list-name">{{djRadio.name}}</div>
          <div class="radio-list-people">
            {{(Num(djRadio.subCount))}}人订阅
          </div>
        </li>
        <li @click.stop="toSub(djRadio.id)" class="radio-list-right" v-if="!djRadio.subed">
          <i class="iconfont iconziyuan1"></i>
          <span>订阅</span>
        </li>
        <li @click.stop="toSub(djRadio.id)" class="radio-list-right-subed" v-else>
          <i class="iconfont iconziyuan1"></i>
          <span>已订阅</span>
        </li>
      </ul>
      <ul class="radio-list-play" v-if="isPlay">
        <li class="radio-list-play-left">
          <i class="iconfont iconbofang4"></i>
        </li>
        <li class="radio-list-play-center">
          <div>继续播放:</div><div class="play-content">哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多</div>
        </li>
        <li class="radio-list-play-right" @click.stop="close">
          <i class="iconfont icondel2"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {serializeNumber} from '../../../assets/js/number'
    export default {
      name: 'radioMessage.vue',
      data () {
        return {
          playing:'playing',
        }
      },
      props: {
        djRadio: {
          type: Object,
          default: {}
        },
        isPlay: {
          type:Boolean,
          default:false
        }
      },
      methods: {
        toSub (rid) {
          if (this.djRadio.subed) {
            this.$createDialog({
              type: 'confirm',
              title: '确定不再收藏该电台？',
              zIndex:2001,
              confirmBtn: {
                text: '确定',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '取消',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onConfirm: () => {
                this.$api.radios.subs(rid, 0).then(res => {
                  if (res.status === 200) {
                    this.$createToast({
                      type: 'text',
                      time: 1000,
                      txt: '电台已取消收藏'
                    }).show()
                    // this.$refs.Sub.innerHTML--
                    // this.isSub = false
                    this.$emit('issub',false)
                  }
                })
              }
            }).show()
          } else {
            this.$api.radios.subs(rid, 1).then(res => {
              if (res.status === 200) {
                const toast = this.$createToast({
                  txt: '电台已收藏',
                  type: 'correct',
                  time: 2000
                })
                toast.show()
                // this.$refs.Sub.innerHTML++
                // this.isSub = true
                this.$emit('issub',true)
              }
            })
          }
        },
        close () {
          this.isPlay = false
        },
        transTime (timestamp) {
          let date = new Date(timestamp)
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1) + '-'
          let D = date.getDate() 
          return Y + M + D
        },
        Artist (artist) {
          let arr = []
          artist.forEach(item => {
            arr.push(item.name)
          })
          return arr.join('/')
        },
        Num (num) {
          return serializeNumber(num)
        },
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .radio
    // background-color:none
    position: relative
    height:240px
    width:100%
    .radio-wrap
      position: absolute
      bottom:-15px
      height:auto
      width:100%
      .playing
        margin-bottom:20px
      .radio-list
        height:auto
        width:100%
        flex-between()
        font-size:$font-size-medium
        // margin-bottom:20px
        .radio-list-left
          margin-left:10px
          color:white
          .radio-list-name
            font-weight:bold
            height:25px
          .radio-list-people
            font-size:$font-size-small
            height:25px
            opacity:.7
        .radio-list-right
          height:25px
          width:80px
          flex-center()
          background-color:red
          color:white
          font-size:$font-size-small
          border-radius:12.5px
          margin-right:10px
          i 
            font-size:$font-size-small
            margin-right:5px
        .radio-list-right-subed
          height:25px
          width:80px
          flex-center()
          background-color:none
          color:white
          opacity:.7
          font-size:$font-size-small
          border-radius:12.5px
          margin-right:10px
          border:1px solid rgba(255,255,255,.7)
          i 
            font-size:$font-size-small
            margin-right:5px
      .radio-list-play
        height:50px
        width:100%
        flex-between()
        background-color:rgba(255,255,255,.5)
        border-top-left-radius:20px
        border-top-right-radius:20px
        position:relative
        .radio-list-play-left
          margin-left:20px
          color:red
          margin-top:-10px
        .radio-list-play-center
          position:absolute 
          top:14px 
          left:50px
          font-size:$font-size-small
          display:flex
          .play-content
            margin-left:10px
            max-width:215px
            ellipsis() 
        .radio-list-play-right
          margin-right:20px
          color:black
          margin-top:-10px 
          opacity:.9 
          i 
            font-size:$font-size-large-x
</style>
