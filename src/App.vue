<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
      <!-- v-if="isRouterAlive" -->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tab></tab>
    <music-player></music-player>
  </div>
</template>

<script>
    import Tab from './components/tabbar/tabbar'
    import MusicPlayer from './components/musicplayer/index'

    export default {
      name: 'app',
      provide () {
        return {
          reload: this.reload
        }
      },
      data () {
        return {
          isRouterAlive: true
        }
      },
      methods: {
        reload () {
          this.isRouterAlive = false
          this.$nextTick(function () {
            this.isRouterAlive = true
          })
        }
      },
      components: {
        Tab,
        MusicPlayer
      }
    }
</script>

<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
