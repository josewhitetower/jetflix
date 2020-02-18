<template>
  <div class="container mx-auto px-4 mt-24">
    <Navigation />
    <Search @search="onSearch" />
    <nuxt />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import Navigation from '@/components/Navigation.vue'
export default {
  components: {
    Search,
    Navigation
  }
}
</script>

<style></style>
