<template>
  <ul class="ul-list">
    <li v-for="(item, index) in tracks" :key="item.id" v-if="!checkbox">
      <div class="song-base">
        <div class="left-img">
          <img v-lazy="item.album.picUrl" alt="" :key="item.album.picUrl">
        </div>

        <div class="song-base-content">
          <div class="title" :class="[playing ? 'activeColor' : '']">
            <span class="title-left">{{item.name}}</span>
            <span class="title-right" v-if="item.alias && item.alias.length">({{item.alias[0]}})</span>
          </div>
          <div class="desc">
            <!-- <img src="" alt="" class="sq"> -->
            <span class="nickname">{{Artist(item.artists)}}</span> -
            <span class="name">{{item.album.name}}</span>
          </div>
        </div>

        <div class="playing" v-if="item.mvid">
          <i class="iconfont iconbofang5"></i>
        </div>
        <div class="more" @click="more(index)">
          <i class="iconfont icongengduo"></i>
        </div>
      </div>
    </li>

    <cube-checkbox-group v-model="checkList" @input="Input">
    <li v-for="(item, index) in tracks" :key="item.id" v-if="checkbox">
      <cube-checkbox :option="{value:index+ +1}" class="checkbox-css">

      <div class="song-base">
        <div class="left-img">
          <img v-lazy="item.album.picUrl" alt="" :key="item.album.picUrl">
        </div>

        <div class="song-base-content">
          <div class="title" :class="[playing ? 'activeColor' : '']">
            <span class="title-left">{{item.name}}</span>
            <span class="title-right" v-if="item.alias && item.alias.length">({{item.alias[0]}})</span>
          </div>
          <div class="desc">
            <span class="nickname">{{Artist(item.artists)}}</span> -
            <span class="name">{{item.album.name}}</span>
          </div>
        </div>
       
      </div>

      </cube-checkbox>
    </li>
    </cube-checkbox-group>
  </ul>
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
          val: 1
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
        more (index) {
          this.$emit('more', index)
        },
        Input () {
          if (this.checkList.length === this.tracks.length) {
            this.$emit('toAll', 1)
          } else {
            this.$emit('toAll', 0)
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
        },
        allToCheckNo () {
          this.checkList = []
        },
        Artist (items) {
          let arr = []
          items.forEach(ele => {
            arr.push(ele.name)
          })
          return arr.join('/')
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  
  .ul-list
    height:auto
    width:375px
    background-color:white
    .song-base
      display:flex
      width:375px
      height:50px
      position:relative
      .left-img
        width: 40px
        height:40px
        flex-center()
        margin:auto 10px
        img 
         width:100%
         height:100%
         border-radius:5px
      .song-base-content
        height:50px
        position:absolute
        left:60px
        max-width:250px
        .title
          font-size:$font-size-medium
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
