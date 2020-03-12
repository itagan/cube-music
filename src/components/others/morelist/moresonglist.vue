<template>
  <div class="wrap">
    <my-header class="my-header">
      <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
      <div slot="center" class="collect">我的收藏</div>
      <i class="iconfont iconnetease" slot="right" @click="music"></i>
    </my-header>
    <ul class="my-slide">
      <li>
        <div :index="0" @click="toggles(0)" class="li-one" :class="[currentPage === 0 ? activeClass : '', errorClass]"> 创建的歌单 </div>
         <div :style="[currentPage === 0 ? {color:'red'} : {color:'gray'}]" class="nav-number">{{playlist.slice(1).length}}</div>
      </li>

      <li>
        <div :index="0" @click="toggles(1)" class="li-one" :class="[currentPage === 1 ? activeClass : '', errorClass]"> 收藏的歌单 </div>
         <div :style="[currentPage === 1 ? {color:'red'} : {color:'gray'}]" class="nav-number">{{collection.length}}</div>
      </li>
    </ul>
    <div class="content">
       <cube-slide
          :data="objs"
          :initialIndex="currentPage"
          :loop="false"
          :autoPlay="false"
          :threshold="0.1"
          :showDots = 'false'
          @change="slideChange">
          <cube-slide-item :index="0">
           <create-list :playlist="playlist" :nums="nums"></create-list>
          </cube-slide-item>

          <cube-slide-item :index="1">
           <collection-list :collection="collection"></collection-list>
          </cube-slide-item>

        </cube-slide>
    </div>
  </div>
</template>

<script>
    import MyHeader from '../../../base/navbar/navbar'
    import createList from './createlist'
    import collectionList from './collectionlist'
    export default {
      name: 'moresonglist.vue',
      components: {
        MyHeader,
        createList,
        collectionList
      },
      data () {
        return {
          activeClass: 'nav-item-active',
          errorClass: '',
          numberColor: 'nav-number',
          currentPage: 0,
          objs: [
            {
              text: '创建的歌单'
            },
            {
              text: '收藏的歌单'
            }
          ],
          playlist: [],
          collection: [],
          nums: 0,
          userId: 477726475
        }
      },
      methods: {
        getPlaylist () {
          this.$api.users.playlist(this.$route.params.userId).then(res => {
            this.playlist = res.data.playlist.filter((item) => {
              item.creator.userId === this.userId
            })
            this.collection = res.data.playlist.filter((item) => {
              item.creator.userId !== this.userId
            })
            this.playlists = res.data.playlist
            console.log(this.playlist)
            // console.log(this.collection[10].creator.userId === this.$route.params.userId)
          })
          // this.playlists = res.data.playlist
          // console.log(this.playlists[0])
        },
        toBack () {
          this.$router.go(-1)
        },
        music () {

        },
        toggles (index) {
          this.currentPage = index
        },
        slideChange (index) {
          this.currentPage = index
        }
      },
      created () {
        // this.getList()
        this.getPlaylist()
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"

  .wrap
    .my-header
      font-size:$font-size-medium-x
      background-color:white
    .my-slide
      // flex-between()
      display:flex
      height:40px
      background-color:white
      // position:relative
      border-bottom:1px solid rgba(128,128,128,.1)
      font-size:$font-size-medium
      margin-top:50px
      li
        width:50%
        height:40px
        line-height:40px
        display:flex
        // flex-around()
        .li-one
          width:70px
          height:100%
          margin-left:30%
        .nav-number
          font-size:$font-size-small 
          margin-left:5px   
    .content
      background-color:white
      height:577px
      .cube-slide
        height:577px !important
        z-index:2001
    .nav-item-active
      color: red
      border-bottom:1.5px solid red      
</style>
