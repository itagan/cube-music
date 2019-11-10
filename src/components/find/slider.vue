<template>

    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
        <a :href="item.url">
          <img :src="item.image">
        </a>
      </cube-slide-item>
      <template slot="dots" slot-scope="props">
        <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots">{{index + 1}}</span>
      </template>w
    </cube-slide>
</template>

<script>
  import {find} from '../../api/api'
    export default {
        data() {
            return {
                items: [
                    {
                        url: 'http://www.didichuxing.com/',
                        image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
                    },
                    {
                        url: 'http://www.didichuxing.com/',
                        image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
                    },
                    {
                        url: 'http://www.didichuxing.com/',
                        image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
                    }
                ]
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
                const res = find.slide;
                console.log(res)
            }

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cube-slide-dots
    position:absolute
    bottom: 15px
    .my-dot
      width: 5px
      height: 5px
      border-radius:50%
</style>
