<template>
  <div>
    <header></header>
  </div>
</template>

<script>
    import Header from './header'
    export default {
      name: 'user.vue',
      components: {
        Header
      },
      data () {
        return {
          title: ''
        }
      }
    }
</script>

<style scoped>

</style>
