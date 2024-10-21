<template>
  <div class="container mx-auto px-4 mt-24 relative pb-12">
    <Navigation />
    <div
      class="fixed animate-pulse bg-green-600 p-2 rounded text-sm z-10"
      v-if="notification"
    >
      {{ notification.message }}
    </div>
    <Search />
    <div class="mb-10 transform z-20 pb-3 hidden md:block">
      <div class="flex flex-wrap">
        <nuxt-link
          v-for="genre in genres"
          :key="genre.id"
          :to="`/genre/${genre.id}`"
          :title="genre.name"
          class="mr-2 rounded px-3 py-2 mb-1 text-sm bg-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out"
          >{{ genre.name }}</nuxt-link
        >
      </div>
    </div>
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
import { genresQuery } from '@/queries/queries'
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
  },
  apollo: {
    genres: {
      query: genresQuery
    }
  }
}
</script>

<style></style>
