<template>
  <div class="wrapper">
    <my-header class="header">
      <div slot="left" @click="toBack" class="header-left">
         <i class="iconfont iconfanhui"></i>
      </div>
      <div  slot="center" class="header-center">
        编辑歌单信息
      </div>
      <div  slot="right" class="header-right">
        <i class="iconfont iconbofangzhuangtaizanting" @click="music"></i>
      </div>
    </my-header>
   
    
    <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options">
          <ul class="content">
            <li class="content-cover content-flex">
              <span>更换封面</span>
              <div>
                <img :src="playlist.coverImgUrl" alt="">
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-flex content-name" @click="toUpdateTitle"> 
              <span>名称</span>
              <div>
                {{playlist.name}}
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-flex content-label" @click="toSelectTags">
              <span>标签</span>
              <ul v-if="playlist.tags.length">
                <li class="content-label-text" v-for="item in playlist.tags" :key="item"> 
                  {{item}}
                </li>
              </ul>
              <ul v-else>
                <li class="content-label-one">
                  无
                </li>
              </ul>
              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-desc">
              <div class="content-desc-top">介绍</div>
              <div class="content-desc-bottom">
                <textarea :placeholder="placeholder" v-model="value"  @input="descInput" :maxlength="maxlength"> </textarea>
              </div>
              <div class="content-desc-bottom-num">{{surplus}}</div>
            </li>
           
          </ul>
      </cube-scroll>
    </div>

    <my-tags ref="Tag" :playlist="playlist"></my-tags>
    <my-title ref="Title" :playlist="playlist"></my-title>
  </div>
</template>

<script>
import MyHeader from '../../../base/navbar/navbar'
import myTags from './tags'
import myTitle from './updatetitle'
export default {
  components: {
    MyHeader,
    myTags,
    myTitle
  },
  props: {
  },
  data () {
    return {
      options: {
        scrollbar: true
      },
      value: '',
      placeholder: '歌单介绍',
      surplus: 1000,
      maxlength: 1000,
      playlist: {}
    }
  },
  watch: {
    value (val) {
      if (val.length >= 1000) {
        this.value = val.substring(0, 1000)
        this.surplus = 0
      }
    }
  },
  computed: {},
  methods: {
    getDesc () {
      this.playlist = JSON.parse(this.$route.query.playlist)
      console.log(this.playlist)
      this.value = this.playlist.description
    },
    toBack () {
      this.$api.songLists.updatedesc(this.playlist.id, this.value).then(res => {
        console.log(res.data)
      })

      this.$router.go(-1)
    },
    music () {},
    descInput () {
      let val = this.value.length
      this.surplus = 1000 - val
    },
    toSelectTags () {
      this.$refs.Tag.show()
    },
    toUpdateTitle () {
      this.$refs.Title.show()
    }
  },
  created () {
    this.getDesc()
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  
  .wrapper
    width: 100%
    height: 100%
    .header
      background-color:white
      font-size:$font-size-medium-x
    


    .scroll-list-wrap
      height:567px  
      position:relative
      top:50px
      .content
        height:auto
        font-size:$font-size-medium
        li
          margin:5px auto
          background-color:white
          padding:0 10px
          // border-top:7px solid rgba(128,128,128,.1)
        .content-flex
          flex-between()
          position: relative
          i 
            color:gray
        .content-cover
          height:80px
          line-height:80px
          div
            position: absolute
            right:20px
            height:50px
            width:50px
            border-radius:5px
            img
             height:100%
             width:100%
             border-radius:5px
        .content-name
          height:60px
          line-height:60px
          div
            position: absolute
            right:30px
            height:60px
            line-height:normal
            max-width:200px
            // line-height:50px
            // line-height:1.5
            multiline-ellipsis($num=2)
            text-align:right
            flex-center()

        .content-label
          height:60px
          line-height:60px
          ul
            display:flex
            flex-wrap:wrap
            position: absolute
            right:20px
            border-radius:5px 
            li
              margin-right:5px
              margin-top:5px
            .content-label-text
              width:auto
              height:15px
              border-radius:8px
              border:1px solid rgba(128,128,128,.2)
              font-size:$font-size-small
              flex-center()
              padding:0 5px             
        .content-desc
          height:auto
          line-height:1.5 
          position: relative
          white-space: normal
          .content-desc-top
            height:40px
            line-height:40px
            border-bottom:1px solid rgba(128,128,128,.1)
          .content-desc-bottom
            height:150px
            line-height:1.5 
            textarea
              width:100%
              height:100%
              outline:none
              resize:none
          .content-desc-bottom-num
            position:absolute
            bottom:10px  
            right:10px
            color:gray

</style>