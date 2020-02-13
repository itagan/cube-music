<template>
  <div class="share">
    <cube-popup ref="popup" @mask-click="hide" :position="'bottom'" :zIndex="2004">

      
    <transition name="cube-action-sheet-move">

      <div class="build">
        <ul class="top">
          <li class="top-left">收藏到歌单</li>
          <li class="top-center">
            <div></div>
          </li>
          <li class="top-bottom" @click="bulidlist">
            <i class="iconfont iconjia"></i>
            <span>新建歌单</span>
          </li>
        </ul>
        
      <div class="scroll-list-wrap" ref="increaseHeight">
        <cube-scroll
          ref="scroll"
          :options="options"
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          >

          <ul class="build-center">
            <li class="li" v-for="item in playlist" :key="item.id" @click="allSub(item.id)">
              <div class="li-item">
                <div class="li-left">
                  <img v-lazy="item.coverImgUrl" v-if="item" :key="item.coverImgUrl">
                </div>

                <div class="li-right">
                  <div class="li-right-top">{{item.name}}</div>
                  <div class="li-right-bottom" v-if="item">{{item.trackCount}}首</div>
                </div>

                <div class="playing">
                  <i class="iconfont iconlaba" v-show="playing"></i>
                </div>
              </div>
            </li>
          </ul>
          
        </cube-scroll>
      </div>

      </div>

            </transition>

    </cube-popup>
  </div>
</template>

<script>
    export default {
      name: 'playMore.vue',
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
          codes:[]
        }
      },
      props: {
        checkLists: {
          type:Array,
          default:[]
        }
      },
      created() {},
      methods: {
        show () {
          this.$refs.popup.show()
          this.$nextTick(() => {
            this.getPlaylist()
          })
        },
        hide () {
          this.$refs.popup.hide()
        },
        getPlaylist () {
          this.$api.users.playlist(477726475).then(res => {
            this.playlist = res.data.playlist.filter((item) => {
              return item.userId === 477726475
            })
          })
        },
        allSub (pid) {
          this.codes = []
          this.checkLists.forEach(item => {
            this.$api.songLists.addDel('add', pid, item.id).then(res => {
            this.codes.push(res.data.code)
          })
          })
          let arr = []
          arr = this.codes.filter(item => {
            return item === 502
          })
          if(arr.length === this.checkLists.length) {
          const toast = this.$createToast({
            txt: '歌曲已存在',
            type: 'error',
            zIndex:2002
          })
          toast.show()
          this.hide() 
          }else {
          const toast = this.$createToast({
            txt: '已收藏到歌单',
            type: 'correct',
            zIndex:2002
          })
          toast.show()
          this.hide() 
          }
        },
        bulidlist () {
          this.hide() 
          this.$emit('bulid')
        },
        scrollHandler ({ y }) {
          this.scrollY = -y
          // this.$refs.increaseHeight.style.height = `${this.scrollY}`
        },
      },
      mounted () {
        // this.$nextTick(() => {
        //   this.getPlaylist()
        // })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
    .build
      position:relative
      bottom:0
      height:auto
      width:100%
      border-top-left-radius:20px
      border-top-right-radius:20px
      background-color:white
      .top
        height:60px
        width:100%
        // padding-left:20px
        font-size:$font-size-small
        flex-between()
        position:relative 
        margin: auto 10px
        li
         height:60px
        .top-left
          line-height:60px
          font-size:$font-size-medium-x
        .top-center
          position:absolute
          left:50% 
          top:10px
          width:80px
          margin-left:-40px
          div
           width:60px
           height:4px
           border-radius:3.5px
           background-color:rgba(128,128,128,.4)
        .top-bottom
          border:1px solid rgba(128,128,128,.4)
          width:100px
          height:25px
          border-radius:15px
          flex-center()
          margin-right:20px
          ont-size:$font-size-medium

    .scroll-list-wrap
      height:360px
      .build-center
        background-color:white
        width:100%
        height:auto
        margin:10px auto
        .li
          height:50px
          line-height:50px
          width:100%
          margin-top:10px
          position:relative
          .li-item
            display:flex
            height:50px
            line-height:50px
            width:100%
            .li-left
              width:50px
              height:50px
              margin-left:10px
              border-radius:5px
              border:1px solid #dcdcdc
              img
                width:100%
                height:100%
            .li-right
              flex:1
              margin-left:10px
              height:50px
              line-height:50px
              max-width:265px
              .li-right-top
                font-size:$font-size-medium
                height:25px
                line-height:25px
                ellipsis()
              .li-right-bottom
                font-size:$font-size-small
                height:20px
                line-height:20px
                color:gray


    .cube-action-sheet-fade-enter, .cube-action-sheet-fade-leave-active
      opacity: 0
    .cube-action-sheet-fade-enter-active, .cube-action-sheet-fade-leave-active
      transition: all .3s ease-in-out

</style>

