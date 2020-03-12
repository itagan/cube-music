<template>
  <div>
    <ul class="ul-list" v-if="!checkbox">
    <li v-for="(item, index) in tracks" :key="item.id" @click.stop="toCheckMusic(item, index)">
      <div class="song-base">
       <div class="num">
          <span v-show="index !== currentIndex">{{index + +1}}</span>
          <i class="iconfont iconlaba" v-show="index === currentIndex"></i>
        </div>

        <div class="song-base-content">
          <div class="title" :style="[index === currentIndex ? {color:'red'} : '']">
            <span class="title-left">{{item.name}}</span>
            <span class="title-right" v-if="item.alia && item.alia.length">({{item.alia[0]}})</span>
          </div>
          <div class="desc">
            <img src="" alt="" class="sq">
            <span class="nickname">{{Artist(item.ar)}}</span>
          </div>
        </div>

        <div class="playing" v-if="item.mv">
          <i class="iconfont iconbofang5"></i>
        </div>
        <div class="more" @click.stop="more(item)">
          <i class="iconfont icongengduo"></i>
        </div>
      </div>
    </li>
  </ul>
  <ul class="ul-list" v-if="checkbox">
    <cube-checkbox-group v-model="checkList" @input="Input">
    <li v-for="(item, index) in tracks" :key="item.id" @click.stop="toCheckMusic(item, index)">
      <cube-checkbox :option="{value:index+ +1}" class="checkbox-css">
      <div class="song-base">
        <div class="song-base-content">
          <div class="title" :style="[index === currentIndex ? {color:'red'} : '']">
            <span class="title-left">{{item.name}}</span>
            <span class="title-right" v-if="item.alia && item.alia.length">({{item.alia[0]}})</span>
          </div>
          <div class="desc">
            <span class="nickname">{{item.ar[0].name}}</span>
          </div>
        </div>
      </div>
      </cube-checkbox>
    </li>
    </cube-checkbox-group>
  </ul>
  </div>
</template>

<script>
    export default {
      name: 'list.vue',
      data () {
        return {
          playing: false,
          checkbox: false,
          activeColor: 'activeColor',
          checkList: [],
          val: 1,
          currentIndex: -1
        }
      },
      props: {
        tracks: {
          type: Array,
          default: []
        },
        complete: {
          type: Boolean,
          default: false
        },
        allShow: {
          type: Boolean,
          default: false
        },
        allCheckbox: {
          type: Boolean,
          default: false
        }
      },
      watch: {
        complete (_com) {

        },
        allShow (val) {
          this.checkbox = val
        }
      },
      methods: {
        more (item) {
          this.$emit('more', item)
          console.log(item)
        },
        Input () {
          if (this.checkList.length === this.tracks.length) {
            this.$emit('toAll', 1)
          } else {
            this.$emit('toAll', 0)
          }
          if (this.checkList.length) {
            this.$emit('changebg', true)
          } else {
            this.$emit('changebg', false)
          }
        },
        toCheckMusic (item, index) {
          if (this.checkbox) {
          } else {
            // 播放电台歌曲
            // this.isPlay = true
            this.currentIndex = index
          }
        },
        allToCheck () {
          let arr = []
          for (let i = 1; i <= this.tracks.length; i++) {
            arr.push(i)
          }
          return arr
        },
        allToChecked () {
          this.checkList = [...this.allToCheck()]
          this.$emit('changebg', true)
        },
        allToCheckNo () {
          this.checkList = []
          this.$emit('changebg', false)
        },
            // 选中的有哪些
        whoChecked () {
          this.checkLists = []
          for (let i = 0; i < this.checkList.length; i++) {
            this.checkLists.push(this.tracks[this.checkList[i] - 1])
          }
          console.log(this.checkList)
          console.log(this.checkLists)
          this.$emit('whochecked', this.checkLists)
        },
        Artist (artist) {
          let arr = []
          artist.forEach(item => {
            arr.push(item.name)
          })
          return arr.join('/')
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .ul-list
    min-height:450px
    width:375px
    background-color:white
    .song-base
      display:flex
      width:375px
      height:50px
      position:relative
      .num
        width: 40px
        height:50px
        flex-center()
        color:gray
        .iconlaba
          color:red
      .song-base-content
        height:50px
        position:absolute
        left:40px
        max-width:250px
        .title
          font-size:$font-size-medium-x
          ellipsis()
          max-width:250px
          height:28px
          line-height:28px
          margin-left:3px
          .title-right
            color:gray
        .desc
          font-size:$font-size-small
          color:gray
          ellipsis()
          max-width:250px
      /*height:22px*/
      /*line-height:22px*/
      .playing
        width: 40px
        height:50px
        flex-center()
        position:absolute
        right:30px
        color:gray
      .more
        width: 40px
        height:50px
        flex-center()
        position:absolute
        right:0
        color:gray
      .drag-drop
        position:absolute
        right:20px
        color:gray
        i
          font-size:$font-size-large-x

  .checkbox-css
    position:relative
    .song-base
      left:-40px
  .cube-checkbox
    color:black
/*深度选择器*/
  .cube-checkbox_checked >>>
    .cube-checkbox-ui
      i
        color:red !important

  .activeColor
    color:red !important

</style>
