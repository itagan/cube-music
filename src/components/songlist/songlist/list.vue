<template>
  <div>
    <ul class="ul-list" v-if="!checkbox">
      <li v-for="(item, index) in tracks" :key="item.id"  @click.stop="toCheckMusic(item, index)">
        <div class="song-base">
          <div class="num">
            <span v-show="index !== currentInd">{{index + +1}}</span>
            <i class="iconfont iconlaba" v-show="index === currentInd"></i>
          </div>
          <div class="song-base-content">
            <div class="title" :style="[index === currentInd ? {color:'red'} : '']">
              <span class="title-left">{{item.name}}</span>
              <span class="title-right" v-if="item.tns && item.tns.length">({{item.tns[0]}})</span>
            </div>
            <div class="desc">
              <img src="" alt="" class="sq">
              <span class="nickname">{{item.ar[0].name}}</span>

              <span class="name">{{item.al.name}}</span>
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
      <li class="ul-list-none" v-if="!tracks.length">
        添加歌曲
      </li>
  </ul>
  <ul v-if="checkbox">
    <cube-checkbox-group v-model="checkList" @input="Input">
      <li v-for="(item, index) in tracks" :key="item.id" @click.stop="toCheckMusic(item, index)">
        <cube-checkbox :option="{value:index+ +1}" class="checkbox-css">
        <div class="song-base">
          <div class="song-base-content">
            <div class="title" :style="[index === currentInd ? {color:'red'} : '']">
              <span class="title-left">{{item.name}}</span>
              <span class="title-right" v-if="item.tns && item.tns.length">({{item.tns[0]}})</span>
            </div>
            <div class="desc">
              <img src="" alt="" class="sq">
              <span class="nickname">{{item.ar[0].name}}</span>
              <span class="name">{{item.al.name}}</span>
            </div>
          </div>
          <div  class="drag-drop" v-if="isself">
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
  </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
      name: 'list.vue',
      data () {
        return {
          playing: false,
          checkbox: false,
          activeColor: 'activeColor',
          checkList: [],
          val: 1,
          // currentInd:-1
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
        },
        isself:{
          type: Boolean,
          default: false
        },
        currentInd: {
          type:Number,
          default:-1
        }
      },
      watch: {
        complete (_com) {

        },
        allShow (val) {
          this.checkbox = val
        },
        currentSong (newSong, oldSong) {
          if (!newSong.id  || newSong.id === oldSong.id) {
            return
          }
          this.getInd (newSong.id)
        },
      },
      computed: {
        ...mapGetters([
          'currentSong',
        ]),
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
          if(this.checkList.length) {
            this.$emit('changebg',true)
          }else {
            this.$emit('changebg',false)
          }
        },
        toCheckMusic(item,index) {
          if(this.checkbox) {
          }else {
             this.$emit('changeInd',index)
            // this.currentInd = index
            // this.$router.push({
            //   path: `/musicplayer`,
            //   // query: {
            //   //   item:JSON.stringify(item)
            //   // }
            // })
            this.selectPlay({
              list: this.tracks.slice(),
              index:index
            })
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
          this.$emit('changebg',true)
        },
        allToCheckNo () {
          this.checkList = []
          this.$emit('changebg',false)
        },
        getInd (id) {
          let ind = this.tracks.findIndex(item => {
            return item.id === id
          })
          if(ind >= 0) {
            // this.currentInd = ind
            this.$emit('changeInd',ind)
          }
        },
          // 选中的有哪些
        whoChecked () {
          this.checkLists = []
          for(let i = 0; i < this.checkList.length; i++) {
            this.checkLists.push(this.tracks[this.checkList[i] - 1])
          }
          console.log(this.checkList)
          console.log(this.checkLists)
          this.$emit('whochecked', this.checkLists)
        },
        ...mapActions([
          'selectPlay'
        ])
      },
      mounted () {
        this.$nextTick(() => {
          //  console.log(this.tracks)
          //  console.log(this.currentSong.id)
          // this.getInd (this.currentSong.id)
          // this.$emit('changeCor',this.currentSong.id)
        })
      },
      created () {
        // this.$nextTick(() => {
        //    console.log(this.currentSong.id)
        //   this.getInd (this.currentSong.id)
        // })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
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
