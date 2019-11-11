<template>

    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
        <a :href="item.url" class='sliderLink'>
          <img :src="item.pic" class='sliderImg'>
          <div class="title" :style="{backgroundColor:item.titleColor}">{{item.typeTitle}}</div>
        </a>
      </cube-slide-item>
      <template slot="dots" slot-scope="props">
        <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots">{{index + 1}}</span>
      </template>
    </cube-slide>
</template>

<script>
  // import {find} from '../../api/api'
    export default {
        data() {
            return {
                items: []
            }
        },
        created() {
            this.getSliders();
        },
        methods: {
            changePage(current) {
                console.log('当前轮播图序号为:' + current)
            },
            clickHandler(item, index) {
                console.log(item, index)
            },
            getSliders() {
                 this.$api.find.slide().then((res) => {
                     this.items = res.data.banners;
                     // console.log(res)
                 });
            }

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .cube-slide
    height:130px !important
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
  .sliderLink
    display: block
    width: 100%
    overflow: hidden
    text-decoration: none
    position:relative
    .sliderImg
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
