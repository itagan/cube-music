<template>
  <ul class="ul-list">
    <li v-for="(item, index) in tracks" :key="item.id" v-if="!checkbox">
      <div class="song-base">
        <div class="num">
          <span v-show="!playing">{{index + +1}}</span>
          <i class="iconfont iconlaba" v-show="playing"></i>
        </div>

        <div class="song-base-content">
          <div class="title" :class="[playing ? 'activeColor' : '']">
            <span class="title-left">{{item.name}}</span>
            <span class="title-right" v-if="item.tns && item.tns.length">({{item.tns[0]}})</span>
          </div>
          <div class="desc">
            <img src="" alt="" class="sq">
            <span class="nickname">{{item.ar[0].name}}</span>

            <span class="name">{{item.al.name}}</span>
          </div>
        </div>

        <div class="playing">
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
        <div class="song-base-content">
          <div class="title" :class="[playing ? 'activeColor' : '']">
            <span class="title-left">{{item.name}}</span>
            <span class="title-right" v-if="item.tns && item.tns.length">({{item.tns[0]}})</span>
          </div>
          <div class="desc">
            <img src="" alt="" class="sq">
            <span class="nickname">{{item.ar[0].name}}</span>
            <span class="name">{{item.al.name}}</span>
          </div>
        </div>
        <div  class="drag-drop">
          <i class="iconfont icontuozhuai"></i>
        </div>
      </div>

      </cube-checkbox>
    </li>
    </cube-checkbox-group>

    <li class="ul-list-none" v-if="!tracks.length">
      添加歌曲
    </li>
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
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .ul-list
    min-height:400px
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

  .ul-list
    .ul-list-none
      flex-center()
      border:1px solid red
      color:red
      border-radius:11px
      width:140px
      height:22px
      font-size:$font-size-medium
      margin:auto
      margin-top:60px
 
 
 
 
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
