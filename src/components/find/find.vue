<template>
  <div>
    <find-header></find-header>
    <find-slider></find-slider>
  </div>
</template>

<script>
    import FindHeader from './header'
    import FindSlider from './slider'
    export default {
        name: "find.vue",
        components: {
            FindHeader,
            FindSlider
        }
    }
</script>

<style scoped>

</style>
