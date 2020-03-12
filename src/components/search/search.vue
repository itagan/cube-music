<template>
  <div class="wrapper">
    <my-header class="my-header" v-if="hasTips">
      <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
      <div slot="center" class="search-wrap" @click="toSug">
        <i class="iconfont iconsearch"></i>
        <span>{{value}}</span>
        <i class="iconfont iconbuganxingqu" @click.stop="toBack"></i>
      </div>
    </my-header>

   <div class="slide">
    <div class="nav-scroll-list-wrap">
      <cube-scroll 
      ref="navScroll" 
      direction="horizontal"
      :options="options"
      :scroll-events="scrollEvents"
      @scroll="scrollHandler"
      >
        <ul class="nav-wrapper" style="font-size: 14px">
          <li
            v-for="(item, index) in objs"
            :key="index"
            :class="[currentPage === index ? activeClass : '', errorClass]"
            @click.stop="toggles(item,index)"
            ref="distance"
            class="nav-item"
          >{{ item.text }}</li>
        </ul>
      </cube-scroll>
    </div>

    <div class="content">
      <cube-slide
        :data="objs"
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.1"
        :showDots="false"
        :options="options"
        @change="slideChange"
        @scroll="scroll"
        ref="slideScroll"
        >
        <cube-slide-item :key="0">
          <my-all :value="value" @changeIndex="changeIndex" @more="toMoreOpera"></my-all>
        </cube-slide-item>
        <cube-slide-item :key="1">
          <my-songs :value="value" 
          :currentPage="currentPage" 
          @more="toMoreOpera" 
          @allToShow="allToShow" 
          @whochecked="whoChecked"
          @changebg="changeColor"
          ref="toCheck"></my-songs>
        </cube-slide-item>
        <cube-slide-item :key="2">
          <yun-cun :value="value" :currentPage="currentPage"></yun-cun>
        </cube-slide-item>
        <cube-slide-item :key="3">
          <play-list :value="value" :currentPage="currentPage"></play-list>
        </cube-slide-item>
        <cube-slide-item :key="4">
          <my-singer :value="value" :currentPage="currentPage"></my-singer>
        </cube-slide-item>
        <cube-slide-item :key="5">
          <my-album :value="value" :currentPage="currentPage"></my-album>
        </cube-slide-item>
        <cube-slide-item :key="6">
         <my-videos :value="value" :currentPage="currentPage"></my-videos>
        </cube-slide-item>
        <cube-slide-item :key="7">
          <div class="noapi">暂无API数据支持</div>
        </cube-slide-item>
        <cube-slide-item :key="8">
          <my-radios :value="value" :currentPage="currentPage"></my-radios>
        </cube-slide-item>
        <cube-slide-item :key="9">
          <my-users :value="value" :currentPage="currentPage"></my-users>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>

  <play-more
      v-if="isMore"
      :key="3"
      @cancel="cancelMore"
      @build="moreBuildList"
      @share="toShare"
      @ring="setRing"
      @collect="toCollected"
      @singer="toSinger"
      @album="toAlbum"
      :track="song"
      ref="playMore"
    ></play-more>
    <share-dialog ref="shareShow" @cancel="cancelShare"></share-dialog>
    <set-ring ref="setRingShow"></set-ring>
    <collection-to-list ref="collectedShow" @bulid="bulidlist" :checkLists="checkLists"> </collection-to-list>
    <build-list  @cancel="cancel" :track="song" ref="showBuild"></build-list>
    <check-footer v-if="allShow" @collect="toCollectedFooter" :addColor="addColor"></check-footer>
  </div>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
import myAll from './all'
import mySongs from './songs'
import yunCun from './yuncun'
import playList from './playlist'
import mySinger from './singers'
import myAlbum from './albums'
import myVideos from './videos'
import myRadios from './radios'
import myUsers from './users'
import playMore from '../common/playmore'
import shareDialog from '../common/sharedialog'
import setRing from '../common/setring'
import collectionToList from '../common/collectiontolist'
import buildList from '../common/buildlist'
import checkFooter from '../common/checkfooter'
export default {
  components: {
    MyHeader,
    myAll,
    mySongs,
    yunCun,
    playList,
    mySinger,
    myAlbum,
    myVideos,
    myRadios,
    myUsers,
    playMore,
    shareDialog,
    setRing,
    collectionToList,
    buildList,
    checkFooter
  },
  props: {},
  data () {
    return {
      value: '',
      placeholder: '请输入内容',
      type: 'password',
      maxlength: 20,
      autofocus: true,
      readonly: false,
      clearable: {
        visible: true,
        blurHidden: true
      },
      hasTips: true,
      suggestions: [],
      options: {
        scrollbar: false,
        bounce: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      },
      scrollEvents: ['scroll'],
      posX: 0,
      activeClass: 'nav-item-active',
      errorClass: '',
      currentPage: 0,
      videoGroupId: 9102,
      objs: [
        {
          text: '综合',
          id: 9102
        },
        {
          text: '单曲',
          id: 3100
        },
        {
          text: '云村',
          id: 2100
        },
        {
          text: '歌单',
          id: 58101
        },
        {
          text: '歌手',
          id: 58100
        },
        {
          text: '专辑',
          id: 1101
        },
        {
          text: '视频',
          id: 60100
        },
        {
          text: '歌词',
          id: 1103
        },
        {
          text: '主播电台',
          id: 5100
        },
        {
          text: '用户',
          id: 1000
        }
      ],
      isMore: false,
      isBuild: false,
      visible: false,
      allShow: false,
      addColor: false,
      song: {},
      checkLists: []
    }
  },
  watch: {
    isBuild (val) {
      if (val) {
        this._dialog.afterOpen()
      } else {
        this._dialog.beforeClose()
      }
    },
    isMore (val) {
      if (val) {
        this._dialog.afterOpen()
      } else {
        this._dialog.beforeClose()
      }
    },
    currentPage (val) {
      if (val !== 1) {
        this.allShow = false
      }
    }
  },
  computed: {},
  methods: {
    toBack () {
      this.$router.go(-1)
    },
    input (val) {
    },
    Placeholder () {
      this.value = this.$route.params.content
    },
    toSug () {
      // this.hasTips = false
      // this.autofocus = true
      // this.getSuggestion (this.value)
      this.$router.push({
        path: `/hotsearch/${this.value}`
      })
    },
    input (val) {
      if (val.length > 0) {
        this.hasTips = false
        this.getSuggestion(val)
      } else {
        this.hasTips = true
      }
    },
    toggles (item, index) {
      let leftDistance = this.$refs.distance[index].getBoundingClientRect().left
      // console.log(leftDistance)
      // if(this.posX ===0 || this.posX === -191) {
      //   this.$refs.navScroll.scroll.scrollBy(170 - leftDistance,0,350)
      // }
      // this.$refs.slideScroll.scroll.getCurrentPage()
      this.$refs.navScroll.scroll.scrollBy(170 - leftDistance, 0, 350)
      this.currentPage = index
    },
    slideChange (index) {
      let leftDistance = this.$refs.distance[index].getBoundingClientRect().left
      // this.$refs.navScroll.scroll.scrollBy(170 - leftDistance,0,350)
      this.currentPage = index
    },
    scrollHandler (pos) {
      // console.log(pos.x)
      this.posX = pos.x
    },
    changeIndex (i) {
      this.currentPage = i
      // this.$refs.slideScroll.scroll.goToPage(i, 0, 300)
      this.$refs.slideScroll.refresh()  // 刷新一下轮播，避免点击回到全部无效
    },
    scroll ({x, y}) {
      console.log(x, y)
    },
    allToShow (type) {
      if (type === true) {
        this.allShow = true
      } else {
        this.allShow = false
      }
    },
    changeColor (type) {
      if (type) {
        this.addColor = true
      } else {
        this.addColor = false
      }
    },
    toSinger () {
      this.$api.singers.singermusic((this.song.artists && this.song.artists[0].id) || (this.song.ar && this.song.ar[0].id)).then(res => {
        if (res.data.artist.accountId) {
          let userId = res.data.artist.accountId
          this.$router.push({
            path: `/singer/${userId}/${(this.song.artists && this.song.artists[0].id) || (this.song.ar && this.song.ar[0].id)}`
          })
        } else {
          let userId = 477726475
          this.$router.push({
            path: `/singer/${userId}/${(this.song.artists && this.song.artists[0].id) || (this.song.ar && this.song.ar[0].id)}`
          })
        }
      })
    },
    toAlbum () {
      this.$router.push({
        path: `/albumlist/${(this.song.album && this.song.album.id) || (this.song.al && this.song.al.id)}`
      })
    },
    cancel () {
      this.isBuild = false
      this.$refs.collectedShow.hide()
    },
    toMoreOpera (item) {
      this.isMore = true
      this.$nextTick(() => {
        this.$refs.playMore.show()
      })
      this.song = item
      this.checkLists = []
      this.checkLists.push(item)
    },
    moreBuildList () {
      this.isMore = false
      this.isBuild = true
        // 手动调用，解决打开更多再新建歌单产生滚动现象的bug。
      this.$nextTick(() => {
        this._dialog.afterOpen()
      })
    },
    cancelMore () {
      this.$refs.playMore.hide()
        // this.isMore = false
        // this.$nextTick(() => {
        //     this.$refs.playMore.hide()
        // })
      setTimeout(() => {
        this.isMore = false
      }, 500)
    },
    cancelShare () {
      this.$refs.shareShow.hide()
      setTimeout(() => {
        this.isMore = false
      }, 500)
    },
    toShare () {
      this.$refs.shareShow.show()
    },
    setRing () {
      this.$refs.setRingShow.show()
    },
    bulidlist () {
      // this.isBuild = true
      this.isMore = false
      this.$refs.showBuild.show()
    },
    toCollected () {
      this.isMore = false
      this.$refs.collectedShow.show()
    },
    toCollectedFooter () {
      this.$refs.toCheck.whoChecked()
      if (this.checkLists.length) {
        this.$refs.collectedShow.show()
      }
    },
    whoChecked (checkLists) {
      this.checkLists = []
      this.checkLists = checkLists
      console.log(this.checkLists)
    }
  },
  created () {
    this.Placeholder()
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:auto
    width:375px
    .my-header
      height:50px
      line-height:50px
      background-color:white
      .iconfanhui
        font-size:$font-size-large + 5
      .search-wrap
        flex-between()
        height:35px
        width:300px
        border-radius:20px
        background-color:rgba(128,128,128,.1)
        margin-right:-20px
        font-size:$font-size-medium
        position:relative
        span 
          position:absolute
          left:35px
        i 
          width:25px
          line-height:35px
          font-size:$font-size-medium-x
          text-align:center
        .iconsearch
          margin-left:10px 
        .iconbuganxingqu
          margin-right:10px  

    .slide
      .content
        height: 567px
        .cube-slide
          height:567px !important

    .slide
      font-size:$font-size-medium-x
      .nav-scroll-list-wrap >>> 
        transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
        position: relative
        background-color: white
        padding: 15px 0
        top:30px
        font-size:$font-size-medium-x
        .cube-scroll-content
          display: inline-block
          width:auto
          .nav-wrapper
            white-space: nowrap
            line-height: 42px
            padding: 0 5px
            display:flex
            border-bottom:.5px solid rgba(128,128,128,.2)
            .nav-item
              display: inline-block
              padding: 0 5px
              min-width:30px
              height:40px
              line-height: 40px
              margin-right:10px
              text-align:center
              font-weight:bold
              &:nth-child(2)
                margin-right:25px
              &:nth-last-child(2)
                margin-right:25px

        .cube-scroll-wrapper 
          width:375px

        .nav-item-active
          color: red
          border-bottom:2px solid red  

     .noapi
       height:500px
       padding-bottom:100%
       color:red
       background-color: white
       flex-center()
       margin-top:20px
     
     .cube-input_active::after
      border:none     

</style>