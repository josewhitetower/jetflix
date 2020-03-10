<template>
  <div class="container mx-auto px-4 mt-24 pb-8 relative pb-12">
    <Navigation />
    <Search />
    <nuxt />
    <footer class="absolute bottom-0 py-4 text-center text-sm w-full">
      Powered by
      <a
        class="underline italic"
        href="https://www.themoviedb.org/"
        rel="nofollow noopener"
        title="The Movie Database"
        target="_blank"
        >The Movie Database</a
      >
    </footer>
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
