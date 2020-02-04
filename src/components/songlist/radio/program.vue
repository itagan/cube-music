<template>
  <div class="wrapper">
    <!-- <div class="pullloadtop"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div>  -->

    <cube-sticky :pos="scrollY">
      <cube-scroll
        :scroll-events="scrollEvents"
        @scroll="scrollHandler"
        :options="options">
        <cube-sticky-ele>
          <ul class="sticky-header" v-show="!allShow">
            <li class="sticky-header-right-left">共{{count}}期</li>
            <li class="sticky-header-right-center" @click.stop="toSort">
              <i class="iconfont"></i>
              <span>排序</span>
            </li>
            <li class="sticky-header-right-right"  @click.stop="toCheckMore">
              <i class="iconfont icontuozhuai"></i>
              <span>多选</span>
            </li>
          </ul>
          <ul class="sticky-header-more" v-show="allShow" @click.self="allCheck">
            <li @click.stop="allCheck" class="sticky-header-all">
              <div class="check" :class="checked === true ? 'checked' : '' "></div>
              <div>全选</div>
            </li>
            <li class="complete" @click.self="toComplete">完成</li>
          </ul>
        </cube-sticky-ele>
          <ul class="my-content">
          <li v-for="(item,index) in programs" :key="index" class="li" @click.stop="toCheckMusic(item, index)">
            <song-base class="my-programs-base">
              <!-- 添加一个key属性，来唯一标识该控件，被key标识后会重新渲染，避免不渲染样式bug问题 -->
              <!-- <div slot="leftCheck" class="check" ref="liSong" v-if="allShow" :key="1">
                11
              </div> -->
              <div slot="left">
                <div v-if="!allShow" v-show="index !== currentIndex" :key="1" style="color:gray">
                  <span v-if="issort === false" :key="5">
                    {{index+1}}
                  </span>
                  <span v-else :key="6">
                    {{programs.length - index}}
                  </span>
                </div>
                <i  class="iconfont iconlaba" @click.stop="toIt" v-show="index === currentIndex" v-if="!allShow" :key="2" style="color:red"></i>
                <div class="check" ref="liSong" v-if="allShow" :key="3"></div>
              </div>
              <!-- <i slot="left" class="iconfont iconlaba" @click.stop="toIt" v-show="isPlay" v-if="!allShow"></i> -->
              <div slot="top" class="limit">
                <div class="limit-top" :style="[index === currentIndex ? {color:'red'} : '']">
                  {{item.mainSong.name}}
                </div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom">
                  <div style="margin-right:10px">
                    <span>{{TimeMd(item.createTime)}}</span>
                  </div>
                  <div style="margin-right:10px">
                    <i class="iconfont iconbofang3"></i>
                    <span>{{Num(item.listenerCount)}}</span>
                  </div>
                  <div style="margin-right:10px">
                    <i class="iconfont icondingshi"></i>
                    <span>{{durationsTrans(item.mainSong.duration)}}</span>
                  </div>
                  <!-- <div>已播90%</div> -->
                </div>
              </div>
              <i slot="rightMore" class="iconfont icon-ellipsis" @click.stop="toMoreOpera(item)" v-if="!allShow" :key="4"></i>
            </song-base> 
            </li>
          </ul>
        </cube-scroll>
        <!-- <template slot="fixed" slot-scope="props">
          <ul class="sticky-header">
            <li>{{props.current}}</li>
          </ul>
        </template> -->
    </cube-sticky>
  </div>
</template>

<script>
import songBase from '../../../base/swiper/searchsong'
import {timeMd, durationsTransformation} from '../../../assets/js/timestamp'
import {serializeNumber} from '../../../assets/js/number'
export default {
  components: {
    songBase
  },
  props: {
    value:{
      type:String,
      default:''
    },
    currentPage:{
      type:Number,
      default:0
    },
    id:{
      type:String,
      default:''
    },
    loading: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scrollEvents: ['scroll'],
      scrollY: 0,
      loadData:true,
      result:true,
      allShow:false,
      isPlay:false,
      programs:[],
      checkbox: false,
      checked:false,
      checkList: [],
      checkLists:[],
      options: {
      pullUpLoad: false,
      scrollbar: false,
      click: false
      },
      issort:false,
      count:0,
      currentIndex:-1
    }
  },
  watch: {
    currentPage(val) {
      if(val === 1 && this.loadData) {
        this.getAlls(this.id, 30, 0,false)
        this.loadData = false
      } 
    },
    loading (val) {
      if(val) {
        console.log('重新加载子组件')
        this.getAlls(this.id, 30, 0,false)
      }
    }
  },
  computed: {},
  methods: {
    parget () {
      this.getAlls(this.id, 30, 0,false)
      this.$refs.toScroll.scrollTo(0,0,300)
    },
    getAlls (rid, limit, offset, asc) {
      this.$api.radios.program(rid, limit, offset, asc).then(res => {
        this.programs = res.data.programs
        this.count = res.data.count
        this.$emit('getcount',this.count)
      })
    },
    scrollHandler({ y }) {
      this.scrollY = -y
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
          console.log('去除')
        }else {
          this.$refs.liSong[index].classList.add('checked')
          console.log('添加')
        }
        this.checkList = []
        this.$refs.liSong.filter((item,index) => {
        if(item.classList.contains('checked') === true) {
          this.checkList.push(index)
          }
        })
        this.checkList.length === this.programs.length ? this.checked = true : this.checked = false
        // if(this.checkList.length) {
        //   this.$emit('changebg',true)
        // }else {
        //   this.$emit('changebg',false)
        // }
      }else {
        //播放电台歌曲
        // this.isPlay = true
        this.currentIndex = index
      }
    },
    toCheckMore () {
      this.allShow = true
      this.checkbox = true
      this.$emit('allToShow', true)
    },
    allToCheck () {
      let arr = []
      for (let i = 0; i <= this.programs.length; i++) {
        arr.push(i)
      }
      return arr
    },
    allToChecked () {
      this.checkList = [...this.allToCheck()]
      for(let i = 0; i < this.programs.length; i++) {
        this.$refs.liSong[i].classList.add('checked')
      }
      this.$emit('changebg',true)
    },
    allToCheckNo () {
      this.checkList = []
      for(let i = 0; i < this.programs.length; i++) {
        this.$refs.liSong[i].classList.remove('checked')
      }
      this.$emit('changebg',false)
    },
    toMoreOpera (item) {
      this.$emit('more', item)
      console.log(item)
    },
    toSort () {
      this.programs = this.programs.reverse()
      this.issort = true
    },
    // 选中的有哪些
    whoChecked () {
      this.checkLists = []
      for(let i = 0; i < this.checkList.length; i++) {
        this.checkLists.push(this.programs[this.checkList[i]])
      }
      // console.log(this.checkLists)
      this.$emit('whochecked', this.checkLists)
    },
    TimeMd (timestamp) {
      return timeMd (timestamp)
    },
    durationsTrans (timestamp) {
      return durationsTransformation(timestamp)
    },
    Num (num) {
      return serializeNumber(num)
    },
  },
  // beforeRouteEnter(to,from,next){
  //   if(from.name == 'djcomment'){
  //       // to.meta.keepAlive = true
  //       // console.log('缓存本组件')
  //       to.meta.isBack = true
  //   }else{
  //       // to.meta.keepAlive = false
  //       to.meta.isBack = false
  //   }
  //   next()
  //   },
  // activated(){
  //   if(!this.$route.meta.isBack){
  //       this.getAlls(this.value, 60, 0, 1018)
  //   }else{
  //       //详情页返回操作，比如页面位置
  //   }
  //   },
  created() {
    // this.getAlls(this.value, 60, 0, 1018)
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"

.wrapper
  height:567px
  background-color:white
  .sticky-view-scroll
    .sticky-view-container
      position: absolute
      top: 100px
      bottom: 0
      left: 0
      width: 100%
  .sticky-header
    background-color:#dcdcdc
    height:30px
    line-height:30px
    flex-between()
    position: relative
    margin-top:-2px 
    .sticky-header-right-left
      margin-left:10px
    .sticky-header-right-center
      margin-left:10px
      position:absolute
      right:80px
    .sticky-header-right-right
      margin-right:10px   
  .sticky-header-more  
    height:40px
    line-height:40px
    flex-between()
    position: relative  
    background-color:white 
    margin-top:-2px 
    .complete
      margin-right:10px
      font-size:$font-size-medium + 1
      color:red  
    .sticky-header-all  
      display:flex 
      font-size:$font-size-medium + 1
      .check
        margin:auto 15px 

  .my-content
    .my-programs-base
      .limit
        .limit-top
          max-width:270px
          ellipsis() 
        .limit-bottom
          max-width:270px
          ellipsis()
          display:flex
          i
            font-size:$font-size-small

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