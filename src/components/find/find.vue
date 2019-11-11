<template>
  <div>
    <find-header></find-header>
    <find-slider></find-slider>
    <find-nav></find-nav>
    <find-recommend></find-recommend>
  </div>
</template>

<script>
    import FindHeader from './header'
    import FindSlider from './slider'
    import FindNav from './nav'
    import FindRecommend from './recommendsongs'
    export default {
        name: "find.vue",
        components: {
            FindHeader,
            FindSlider,
            FindNav,
            FindRecommend
        }
    }
</script>

<style scoped>

</style>
