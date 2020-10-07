<template>

  <router-view v-slot="{Component}">
    <keep-alive include="menu">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>


</template>

<script>
  export default {
    head() {
      return {
        htmlAttrs: {lang: 'sv'}
      }
    },
    name: "index",
    created() {
    }
  }
</script>

<style scoped>

</style>