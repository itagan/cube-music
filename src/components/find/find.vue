<template>
  <div>
    <find-header></find-header>
    <find-slider></find-slider>
    <find-nav></find-nav>
    <find-recommend></find-recommend>
    <find-new></find-new>
    <find-videos></find-videos>
  </div>
</template>

<script>
    import FindHeader from './header'
    import FindSlider from './slider'
    import FindNav from './nav'
    import FindRecommend from './recommendsongs'
    import FindNew from './newsong'
    import FindVideos from './videos'
    export default {
        name: "find.vue",
        components: {
            FindHeader,
            FindSlider,
            FindNav,
            FindRecommend,
            FindNew,
            FindVideos
        },

    }
</script>

<style scoped>

</style>
