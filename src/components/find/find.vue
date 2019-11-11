<template>
  <div>
    <find-header></find-header>
    <find-slider></find-slider>
    <find-nav></find-nav>
    <find-recommend></find-recommend>
    <find-new></find-new>
  </div>
</template>

<script>
    import FindHeader from './header'
    import FindSlider from './slider'
    import FindNav from './nav'
    import FindRecommend from './recommendsongs'
    import FindNew from './newsong'
    export default {
        name: "find.vue",
        components: {
            FindHeader,
            FindSlider,
            FindNav,
            FindRecommend,
            FindNew
        },

    }
</script>

<style scoped>

</style>
