<template>
    <cube-slide ref="slide" :data="items">
      <cube-slide-item v-for="(item, index) in items" :key="index">
        <a :href="item.url" class='slider-link'>
          <img :src="item.pic" class='slider-img'>
          <div class="title" :style="{backgroundColor:item.titleColor}">{{item.typeTitle}}</div>
        </a>
      </cube-slide-item>
      <template slot="dots" slot-scope="props">
        <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots" :key="index">{{index + 1}}</span>
      </template>
    </cube-slide>
</template>

<script>
    export default {
      data () {
        return {
          items: []
        }
      },
      created () {
        this.getSliders()
      },
      methods: {
        getSliders () {
          this.$api.find.slide().then((res) => {
            this.items = res.data.banners
          })
        }

      }
    }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .cube-slide
    height:130px !important
    width:355px
    border-radius: 5px
    position: absolute
    top:12px
    margin:0 10px
  .cube-slide-dots
    position:absolute
    bottom: 10px
    .my-dot
      width: 5px
      height: 5px
      border-radius:50%
  .slider-link
    display: block
    width: 100%
    overflow: hidden
    text-decoration: none
    position:relative
    .slider-img
      width:100%
      height: 130px
    .title
      width:30px
      height:13px
      position:absolute
      right:0
      bottom:0
      z-index:10
      font-size:$font-size-small-s - 4
      color:white
      text-align:center
      border-top-left-radius:5px
      border:1px solid transparent

</style>
