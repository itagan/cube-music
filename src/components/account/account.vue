<template>
  <div>
    <my-header></my-header>
    <personal></personal>
    <feature></feature>

    <div>

    </div>
  </div>
</template>

<script>
    import myHeader from './header'
    import Personal from "./personal"
    import Feature from './feature'
    export default {
      name: 'account.vue',
        components: {
            myHeader,
            Personal,
            Feature
        }
    }
</script>

<style scoped>

</style>
