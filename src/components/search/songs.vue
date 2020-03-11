<template>
  <div class="wrapper">

     <div class="pullloadtop" v-if="songCount === 0"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div> 


    <cube-sticky :pos="scrollY" v-if="songCount > 0">
      <cube-scroll
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        ref="contentScroll"
        >
        <cube-sticky-ele>
          <ul class="sticky-header" v-show="!allShow">
              <li class="play-left">
                <i class="iconfont iconbofang2"></i>
                <span>
                  播放全部
                </span>
              </li>
              <li class="play-right" @click.stop="toCheckMore">
                <i class="iconfont icontuozhuai"></i>
                <span>
                  多选
                </span>
              </li>

            </ul>

            <ul class="sticky-header" v-show="allShow" @click.self="allCheck">
              <li @click.stop="allCheck" class="sticky-header-all">
                <div class="check" :class="checked === true ? 'checked' : '' "></div>
                <div>全选</div>
              </li>
              <li class="complete" @click.self="toComplete">完成</li>
            </ul>

        </cube-sticky-ele>
        <ul class="my-content">
          <li v-for="(item,index) in songs" :key="index" class="li" @click.stop="toCheckMusic(item, index)">
            <song-base class="my-songs-base">
              <!-- 添加一个key属性，来唯一标识该控件，被key标识后会重新渲染，避免不渲染样式bug问题 -->
              <div slot="leftCheck" class="check" ref="liSong" v-if="allShow" :key="1">
              </div>
              <i slot="left" class="iconfont iconlaba" @click.stop="toIt" v-if="index === currentIndex"></i>
              <div slot="top" class="limit" :style="[index === currentIndex ? {color:'red'} : '']">
                <div class="limit-top" v-if="item.name">{{item.name}}</div>
              </div>
              <div slot="center" class="limit">
                <div class="limit-bottom">{{item.artists[0].name}} - {{item.album.name}}</div>
              </div>
              <div slot="bottom" class="limit" v-if="item.alias.length">
                <div class="limit-bottom">
                  {{TransAlias(item.alias)}}
                </div>
              </div>
              <i slot="rightPlay" class="iconfont iconbofang2" v-show="item.mvid !== 0" v-if="!allShow" :key="2"></i>
              <i slot="rightMore" class="iconfont icon-ellipsis" @click.stop="toMoreOpera(item)" v-if="!allShow" :key="2"></i>
            </song-base> 
          </li>
        </ul>

        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="pullload">
            <template>
                <span v-if="props.isPullUpLoad" class="load">
                  <i class="iconfont iconyinletiaodongzhuangtai" v-if="hasMore"></i>
                  <span v-if="hasMore"> 加载中...</span>
                  <span v-if="!hasMore"> 没有更多了呢</span>
                </span>
            </template>
          </div>  
        </template>
        </cube-scroll>
    </cube-sticky>

    <!-- <check-footer v-show="allShow"></check-footer> -->
  </div>
</template>

<script>
import followBase from '../../base/swiper/followbase'
import songBase from '../../base/swiper/searchsong'
import checkFooter from '../common/checkfooter'
export default {
  components: {
    followBase,
    songBase,
    checkFooter
  },
  props: {
    value:{
      type:String,
      default:''
    },
    currentPage:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false 
      },
      scrollY: 0,
      scrollEvents: ['scroll'],
      multimatch:{},
      isPlay:false,
      songs:[],
      song:{},
      checked: false,
      allShow: false,
      complete: false,
      hasMore: true,
      songCount:0,
      offset:0,
      count:0,
      result:true,
      checkbox: false,
      activeColor: 'activeColor',
      checkList: [],
      checkLists:[],
      val: 1,
      currentIndex:-1,
    }
  },
  watch: {
    currentPage(val) {
      if(val === 1  && !this.songs.length) {
        this.getSongs(this.value, 60, 0, 1)
      }
      
      if(val !== 1) {
        this.allShow = false
        this.checked = false
        this.checkbox = false
      }
    }
  },
  computed: {},
  methods: {
    getSongs (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.songCount = res.data.result.songCount
        this.hasMore = this.count < this.songCount
        if(this.hasMore) {
          this.count+=30
          this.offset+=10
        }
        this.songs =  this.songs.concat(res.data.result.songs)

        setTimeout(() => {
          this.result = this.songCount > 0 ? true : false
        }, 3000)
      })
    },
    toIt () {

    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    onPullingUp () {
      if(!this.hasMore) return
      setTimeout(() => {
        this.getSongs(this.value, 30, this.offset, 1)
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      }, 1000)
    },
    allCheck () {
      this.checked = !this.checked
      if (this.checked) {
        this.allToChecked()
      } else {
        this.allToCheckNo()
      }
    },
    toComplete () {
      this.allShow = false
      this.checked = false
      this.checkbox = false
      this.allToCheckNo()
      this.checkList = []
      this.$emit('allToShow', false)
      this.$emit('changebg',false)
    },
    TransAlias (alias) {
      let arr = []
      for(let i = 0; i < alias.length; i++) {
        arr.push(alias[i])
      }
      return arr.join('/')
    },
    toCheckMusic(item,index) {
      if(this.allShow) {
        if(this.$refs.liSong[index].classList.contains('checked')) {
          this.$refs.liSong[index].classList.remove('checked')
        }else {
          this.$refs.liSong[index].classList.add('checked')
        }
        this.checkList = []
        this.$refs.liSong.filter((item,index) => {
        if(item.classList.contains('checked') === true) {
          this.checkList.push(index)
          }
        })
        this.checkList.length === this.songs.length ? this.checked = true : this.checked = false
        if(this.checkList.length) {
          this.$emit('changebg',true)
        }else {
          this.$emit('changebg',false)
        }
      }else {
        this.currentIndex = index
        // this.$router.push({
        //   path:`/musicplayer/${item.id}`
        // })
        this.$router.push({
          path: `/musicplayer`,
          query: {
            item:JSON.stringify(item)
          }
        })
        // console.log(item)
      }
    },
    toCheckMore () {
      this.allShow = true
      this.checkbox = true
      this.$emit('allToShow', true)
    },
    allToCheck () {
      let arr = []
      for (let i = 0; i <= this.songs.length; i++) {
        arr.push(i)
      }
      return arr
    },
    allToChecked () {
      this.checkList = [...this.allToCheck()]
      for(let i = 0; i < this.songs.length; i++) {
        this.$refs.liSong[i].classList.add('checked')
      }
      this.$emit('changebg',true)
    },
    allToCheckNo () {
      this.checkList = []
      for(let i = 0; i < this.songs.length; i++) {
        this.$refs.liSong[i].classList.remove('checked')
      }
      this.$emit('changebg',false)
    },
    toMoreOpera (item) {
      this.$emit('more', item)
      console.log(item)
    },
    // 选中的有哪些
    whoChecked () {
      this.checkLists = []
      for(let i = 0; i < this.checkList.length; i++) {
        this.checkLists.push(this.songs[this.checkList[i]])
      }
      // console.log(this.checkLists)
      this.$emit('whochecked', this.checkLists)
    }
  },
  created() {
    // this.getSongs(this.value, 60, 0, 1)
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .wrapper
    .sticky-header
      flex-between()
      height:40px
      background-color:white
      border-bottom:.5px solid rgba(128,128,128,.2)
      margin-top:-2px
      .play-left
        margin-left:10px
        font-size:$font-size-medium-x
        font-weight:bold
      .play-right
        margin-right:10px  
      .complete
        margin-right:10px
        font-size:$font-size-medium + 1
        color:red  
      .sticky-header-all  
        display:flex 
        font-size:$font-size-medium + 1
        .check
          margin:auto 15px
          
        

  .wrapper
    height:567px
    background-color:white
    margin-top:15px
    .sticky-view-scroll
      .sticky-view-container
        position: relative
        top: 50px
        bottom: 0
        left: 0
        width: 100% 

  .wrapper      
    .my-content
      .li
        border-bottom:.5px solid rgba(128,128,128,.2)
        margin-bottom:10px 
        .my-songs-base
          .limit
            .limit-top
              max-width:280px
              ellipsis() 
            .limit-bottom
              max-width:280px
              ellipsis()  
          .check
            height:18px
            width:18px
            border:1px solid rgba(128,128,128,.5) 
            border-radius:50%
            position:relative
          .checked
            height:18px
            width:18px
            border:1px solid red
            border-radius:50%
            position:relative
            background-color:red
          .checked::after
            position: absolute
            top: 2px
            left: 6px
            width: 4px
            height: 10px
            border: 2px solid white
            border-width: 0 1px 1px 0
            content: ''
            transform: rotate(45deg)   
          .iconlaba
            color:red      


  .check
    height:18px
    width:18px
    border:1px solid rgba(128,128,128,.5) 
    border-radius:50%
    position:relative
  .checked
    height:18px
    width:18px
    border:1px solid red
    border-radius:50%
    position:relative
    background-color:red
  .checked::after
    position: absolute
    top: 2px
    left: 6px
    width: 4px
    height: 10px
    border: 2px solid white
    border-width: 0 1px 1px 0
    content: ''
    transform: rotate(45deg)             

 /*深度选择器*/
  .cube-checkbox_checked >>>
  .cube-checkbox-ui
    i
      color:red !important
      

     //加载中相关样式
  .pullload
    width:100%
    height:30px
    margin-top:1px
    background-color:white
    position:relative
    top:0
    bottom:50px
    flex-center()
    // margin:10px auto
    .load
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray
        font-size:$font-size-medium   

  //上方加载中相关样式
  .pullloadtop
    width:100%
    height:30px
    // margin-top:150px
    position:relative
    top:150px
    z-index:1
    flex-center()
    .load
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray  
    .no-result
     color:gray  
     font-size:$font-size-medium   
</style>