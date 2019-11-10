<template>
  <div>
    <find-header></find-header>
    <find-slider></find-slider>
    <find-nav></find-nav>
  </div>
</template>

<script>
    import FindHeader from './header'
    import FindSlider from './slider'
    import FindNav from './nav'
    export default {
        name: "find.vue",
        components: {
            FindHeader,
            FindSlider,
            FindNav
        }
    }
</script>

<style scoped>

</style>
