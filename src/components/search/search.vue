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

    <!-- <my-header class="my-header" v-if="!hasTips">
    <div slot="center" class="search-wrap-tips">
      <div class="my-input">
        <i class="iconfont iconsearch"></i>
        <cube-input
          v-model="value"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :autofocus="autofocus"
          :clearable="clearable"
          @input="input"
          class="my-input-cube"
        ></cube-input>
      </div>
      <div class="cancel" @click="cancel">取消</div>
    </div>
    <i class="iconfont iconyinletiaodongzhuangtai" slot="right"></i>
    </my-header>

    <ul class="search-tips" v-if="!hasTips">
      <li class="search-tips-li-one" @click="_toSearch">
        搜索
        <span>
          "{{value}}"
        </span>
      </li>
      <li v-for="(item, index) in suggestions" :key="index" @click="toSearch(item.keyword)">
        <i class="iconfont iconsearch"></i>
        <span>{{item.keyword}}</span>
      </li>
    </ul> -->

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
            @click="toggles(item,index)"
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
        @change="slideChange">
        <cube-slide-item :key="0">
          <my-all :value="value"></my-all>
        </cube-slide-item>

         <cube-slide-item :key="1">
          <my-songs :value="value"></my-songs>
        </cube-slide-item>
        <cube-slide-item :key="2">
          <yun-cun :value="value"></yun-cun>
        </cube-slide-item>
        <cube-slide-item :key="3">
          <play-list :value="value"></play-list>
        </cube-slide-item>
        <cube-slide-item :key="4">
          <my-singer :value="value"></my-singer>
        </cube-slide-item>
        <cube-slide-item :key="5">
          <my-album :value="value"></my-album>
        </cube-slide-item>
        <cube-slide-item :key="6">
         <my-videos :value="value"></my-videos>
        </cube-slide-item>
        <cube-slide-item :key="7">
          <div class="noapi">暂无API数据支持</div>
        </cube-slide-item>
        <cube-slide-item :key="8">
          <my-radios :value="value"></my-radios>
        </cube-slide-item>
        <cube-slide-item :key="9">
          <my-users :value="value"></my-users>
        </cube-slide-item>
        <div slot="dots"></div>
      </cube-slide>
    </div>

  </div>

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
    myUsers
  },
  props: {},
  data() {
    return {
      value: '',
      placeholder: '请输入内容',
      type: 'password',
      maxlength: 20,
      autofocus: true,
      readonly:false,
      clearable: {
        visible: true,
        blurHidden: true
      },
      hasTips:true,
      suggestions:[],
      options: {
        scrollbar: false
      },
      scrollEvents: ['scroll'],
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
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    toBack () {
      this.$router.go(-1)
    },
    input (val) {
    },
    cancel () {

    },
    Placeholder () {
      this.value = this.$route.params.content
    },
    toSug () {
      // this.hasTips = false
      // this.autofocus = true
      // this.getSuggestion (this.value)
      this.$router.push({
        path:`/hotsearch/${this.value}`
      })
    },
    input (val) {
      if (val.length > 0) {
        this.hasTips = false
        this.getSuggestion (val)
      } else {
        this.hasTips = true
      }
    },
    toggles (item, index) {
      this.currentPage = index
      // this.$refs.navScroll.scroll.scrollBy(-10,0,200)
      // this.$refs.navScroll.scrollToElement('my-header',200,true,true)
    },
    slideChange (index) {
      this.currentPage = index
    },
    scrollHandler (pos) {
      console.log(pos.x)
    },
  },
  created() {
    this.Placeholder()
  },
  mounted() {}
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
     
     .cube-input_active::after
      border:none     

</style>