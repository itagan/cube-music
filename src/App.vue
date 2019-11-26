<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
    import Tab from './components/tabbar/tabbar'
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
        Tab
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
