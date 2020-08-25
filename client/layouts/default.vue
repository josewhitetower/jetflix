<template>
  <div class="container mx-auto px-4 mt-24 relative pb-12">
    <Navigation />
    <div
      class="fixed animate-pulse bg-green-600 p-2 rounded text-sm z-10"
      v-if="notification"
    >
      {{ notification.message }}
    </div>
    <Search v-if="user" />
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
import { mapGetters } from 'vuex'
import Search from '@/components/Search.vue'
import Navigation from '@/components/Navigation.vue'
export default {
  components: {
    Search,
    Navigation
  },
  computed: {
    ...mapGetters({
      user: 'user',
      notification: 'notification'
    })
  }
}
</script>

<style></style>
