<template>
  <div class="wrapper" v-if="showSearch">
    <my-header class="my-header">
    <div slot="center" class="search-wrap">
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

    <div class="scroll-list-wrap" >
        <cube-scroll
          ref="scroll"
          :options="options">
            <div class="history" v-show="hasTips"  v-if="historySearchs.length">
              <div class="history-text">
                <span>搜索历史</span>
                <i class="iconfont icon3" @click.stop="clearHistory"></i>
              </div>

              <div class="scroll-list-wrap-history">
                <cube-scroll
                  ref="scrollHorizontal"
                  direction="horizontal"
                  :options="horizontalOptions"
                  :data="historySearchs"
                  class="horizontal-scroll-list-wrap"
                >
                  <ul class="history-content">
                    <li v-for="(item, index) in historySearchs" :key="index"  @click.stop="toSearch(item)">
                      {{item}}
                    </li>
                  </ul>
                </cube-scroll>
              </div>
            </div>
            <div class="hot-search" v-if="hasTips">
              <div class="hot-search-top">热搜榜</div>
              <div v-if="!hotsearchs.length" class="pull-load-top">
                <span class="load">
                    <i class="iconfont iconyinletiaodongzhuangtai"></i>
                    <span> 正在加载...</span>
                </span>
              </div> 
              <ul class="hot-search-content">
                <li v-for="(item, index) in hotsearchs" :key="item.score" @click="toSearch(item.searchWord)">
                  <div class="hot-search-li-left" :style="[index <= 3 ? {color:'red'} : {color:'gray'}]">{{index+ +1}}</div>
                  <div class="hot-search-li-right">
                    <div class="hot-search-li-right-top">
                      <span>{{item.searchWord}}</span>
                      <img :src="item.iconUrl" alt="" v-if="item.iconUrl">
                    </div>
                    <div class="hot-search-li-right-bottom">
                      {{item.content}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <ul class="search-tips" v-else>
              <li class="search-tips-li-one" @click.stop="toSearch(value)">
                搜索
                <span>
                  "{{value}}"
                </span>
              </li>
              <li v-for="(item, index) in suggestions" :key="index" @click.stop="toSearch(item.keyword)">
                <i class="iconfont iconsearch"></i>
                <span>{{item.keyword}}</span>
              </li>
            </ul>
        </cube-scroll>
      </div>
  </div>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
import mySearch from '../../base/search/searchcancel'
import {saveHistory, loadHistory, deleteAllHistory} from '../../common/js/goodstorage'
export default {
  components: {
    MyHeader,
    mySearch
  },
  props: {},
  data () {
    return {
      options: {
        scrollbar: true
      },
      horizontalOptions: {
        scrollbar: true
      },
      hotsearchs: [],
      hasTips: true,
      suggestions: [],
      historySearchs: [],
      value: '',
      placeholder: '请输入内容',
      type: 'password',
      maxlength: 20,
      autofocus: true,
      clearable: {
        visible: true,
        blurHidden: true
      },
      showSearch: true
    }
  },
  watch: {
    $route (to, from) {
      if (from.fullPath === `/search${this.value}`) {
      }
    }
  },
  computed: {},
  methods: {
    goToSearch () {
      this.fake = true
      console.log('触发')
      this.hasTips = false
      this.getSuggestion('海阔天空')
    },
    cancel () {
      //  this.$refs.search.hide()
      this.$emit('cancal')
      this.showSearch = false
    },
    getHotSearch () {
      this.$api.searchs.searchHotDetail().then(res => {
        setTimeout(() => {
          this.hotsearchs = res.data.data
        }, 1000)
      })
    },
    getSuggestion (keywords) {
      this.$api.searchs.searchSuggestion(keywords).then(res => {
        this.suggestions = res.data.result.allMatch
      })
    },
    getSearchDefault () {
      this.$api.searchs.searchDefault().then(res => {
        this.placeholder = res.data.data.showKeyword
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
    toSearch (keyword) {
      this.$router.push({
        path: `/search/${keyword}`
      })
      this.toStore(keyword)
    },
    Placeholder () {
      this.value = this.$route.params.content
      console.log(this.value)
      if (this.value) {
        this.hasTips = false
        this.getSuggestion(this.value)
      }
    },
    toStore (keyword) {
      saveHistory(keyword)
      this.getHistorys()
    },
    getHistorys () {
      this.historySearchs = loadHistory()
    },
    clearHistory () {
      this.$createDialog({
        type: 'confirm',
        title: '确认清空全部历史记录？',
        confirmBtn: {
          text: '确认',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.historySearchs = []
          deleteAllHistory()
        }
      }).show()
    }
  },
  created () {
    this.getHistorys()
    this.getHotSearch()
    this.getSearchDefault()
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
      .search-wrap
        display:flex
        height:35px
        width:320px
        margin-left:-20px
        .my-input
          background-color:rgba(128,128,128,.1) 
          font-size:$font-size-medium
          border-radius:20px
          display:flex
          i 
            width:20px
            line-height:35px
            font-size:$font-size-medium-x
            text-align:center
            margin-left:10px
          .my-input-cube
            width:245px
            background-color:transparent  //透明覆盖自带的白色
            
        .cancel
          font-size:$font-size-medium-x
          line-height:35px
          margin-left:5px
      

    .scroll-list-wrap
      height:567px  
      position:relative
      top:50px
      width:375px 
      font-size:$font-size-medium
      background-color:white
      .history 
        width:100%
        background:linear-gradient(to right,rgba(255,255,255,0),rgba(255,255,255,1))
        .history-text
          height:50px
          width:100%
          flex-between()
          font-size:$font-size-medium-x
          span 
           margin-left:10px
          i 
           margin-right:10px  
        .history-content
          display:flex 
          // min-width:500px
          li
            height:30px  
            width:auto
            padding:0 15px
            margin-right:20px
            background-color:rgba(128,128,128,.1)
            border-radius:15px
            flex-center()
      .hot-search
        height:auto 
        .hot-search-top
          height:50px
          width:100%   
          line-height:50px
          margin-top:10px
          margin-left:10px
          font-size:$font-size-medium-x
        .hot-search-content
          height:auto
          width:100%
          display:flex
          flex-wrap:wrap
          li
            display:flex
            height:60px
            width:160px
            margin:10px
            .hot-search-li-left
              flex-center()
              height:60px
              width:30px
              font-size:$font-size-medium-x
              color:gray
            .hot-search-li-right
              flex:1
              .hot-search-li-right-top
                height:35px
                line-height:35px  
                font-size:$font-size-medium
                display:flex
                ellipsis()
                max-width:110px
                img 
                  height:20px
                  width:20px
                  margin-left:10px
                  margin-top:7.5px
              .hot-search-li-right-bottom
                height:25px
                line-height:25px  
                font-size:$font-size-small
                ellipsis()
                max-width:120px
                color:gray

      .search-tips
        height:100%
        width:100%
        background-color:white
        // margin-top:50px
        font-size:$font-size-medium
        .search-tips-li-one
          color:blue
        li
          height:40px
          line-height:40px
          padding:0 10px
          border-bottom:.5px solid rgba(128,128,128,.2)



        
  .scroll-list-wrap-history >>>  //深度选择器解决样式因scoped隔绝传递问题
    width:375px
    .cube-scroll-wrapper
      width:375px
      .cube-scroll-content
        display: inline-block
        width:auto
      ul
        padding: 5px 10px
        line-height: 30px
        white-space: nowrap
      li
        display: inline-block

   //上方加载中相关样式
    .pull-load-top
      width:100%
      height:100%
      margin-top:50px
      background-color:white
      /*position:relative*/
      /*bottom:50px*/
      flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray

//  .cube-input >>>
//    background-color:inherit !important
.cube-input_active::after
  border:none
</style>