<template>
    <transition name="cube-action-sheet-fade">
    <cube-popup ref="popup" @mask-click="hide" :position="'bottom'" :zIndex="2001" v-show="isVisible">
    <transition name="cube-action-sheet-move">

      <div class="build" v-show="isVisible">
        <div class="build-top">
          <span>电台节目:</span>
          <span v-if="item && item.mainSong">{{item.mainSong.name}}</span>
        </div>
        
      <!-- <div class="scroll-list-wrap" ref="increaseHeight">
        <cube-scroll
          ref="scroll"
          :options="options"
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          > -->

          <ul class="build-center">
            <li class="li" @click.stop="toShare" v-if="toasttype === 'dj'"> 
              <div class="build-icon">
                <i class="iconfont iconbofang2"></i>
              </div>
              <div class="build-text">
                <span>播放节目</span>
              </div>
            </li>
          </ul>
          
        <!-- </cube-scroll>
      </div> -->

      </div>
    </transition>
    </cube-popup>
    </transition>
</template>

<script>
import {mapActions} from 'vuex'

    export default {
      name: 'radiotips.vue',
      data () {
        return {
          options: {
            scrollbar: true
          },
          scrollY: 0,
          scrollEvents: ['scroll'],
          playing:false,
          id:'477726475',
          playlist:[],
          codes:[],
          isVisible: false
        }
      },
      props: {
        item: {
          type:Object,
          default:() => {}
        },
        toasttype:{
          type:String,
          default:''
        }
      },
      created() {},
      methods: {
        show () {
          this.isVisible = true
        },
        hide () {
          this.isVisible = false
        },
        toShare () {
          this.$emit('share')
          this.hide()
        },
        toComment (item) {
          this.$router.push({
            path:`/djcomment`,
            query: {
              dj: JSON.stringify(item)
            }
          })
          let obj = {userId:''}
          obj.userId = item.dj.userId
          this.saveAuthor(obj)
        },
        scrollHandler ({ y }) {
          this.scrollY = -y
          // this.$refs.increaseHeight.style.height = `${this.scrollY}`
        },
        ...mapActions([
          'saveAuthor'
        ])
      },
      mounted () {
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
    .build
      position:fixed
      bottom:0
      height:auto
      width:100%
      border-top-left-radius:20px
      border-top-right-radius:20px
      background-color:white
      .build-top
        height:40px
        line-height:4.5
        width:100%
        font-size:$font-size-small
        margin: auto 10px
        color:gray
        max-width:330px
        ellipsis() 
      .build-center
        background-color:white
        width:100%
        height:auto
        margin:10px auto
        .li
          height:40px
          line-height:40px
          width:100%
          margin-top:10px
          position:relative  
          display:flex
          border-top:.5px solid rgba(128,128,128,.3)
          .build-icon
            margin:auto 10px
            i 
              font-size:$font-size-large-x 
          .build-text
            font-size:$font-size-medium

    // .scroll-list-wrap
    //   height:360px
    //   .build-center
    //     background-color:white
    //     width:100%
    //     height:auto
    //     margin:10px auto
    //     .li
    //       height:50px
    //       line-height:50px
    //       width:100%
    //       margin-top:10px
    //       display:flex
    //       .build-icon
    //         font-size:$font-size-large-x
    //         margin-right:10px
    //       .build-text
    //         font-size:$font-size-medium
</style>
