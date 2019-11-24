<template>
  <div>
    <my-header></my-header>

    <div class="nav-scroll-list-wrap">
      <cube-scroll ref="navScroll" direction="horizontal">
        <ul class="nav-wrapper">
          <li v-for="(item, index) in navTxts" :key="index" class="nav-item">{{ item }}</li>
        </ul>
      </cube-scroll>
      <div class="more-wrapper">
        <span class="more"></span>
      </div>
    </div>

    <div class="content-scroll-wrapper">
      <div class="content-scroll-list-wrap" ref="scrollWrapper">
        <cube-scroll
          ref="contentScroll"
          :data="content"
          :options="options"
          >
          <ul class="imgs-wrapper">
            <li v-for="(item, index) in content" :key="index" class="imgs-item">
              <img :src="item.url">
            </li>
          </ul>

        </cube-scroll>
      </div>
    </div>


  </div>
</template>

<script>
    const txts = ['关注', '推荐', '新时代', '热点', '体育', '娱乐', '科技', '头条号', '问答', '国际', 'cube-ui666']

    import myHeader from './header'

    export default {
        name: "my.vue",
        components: {
            myHeader,

        },
        data() {
            return {
                content: imgs.slice(),
                options: {
                    pullDownRefresh: {
                        threshold: 60,
                        // stop: 44,
                        stopTime: 1000,
                        txt: '更新成功'
                    },
                    pullUpLoad: true
                },
                navTxts: txts,
                secondStop: 26
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
