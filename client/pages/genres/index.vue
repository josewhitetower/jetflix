<template>
  <div class="bg-transparent mb-10 transform z-20 pb-3">
    <h2 class="mb-3 font-semibold">Genres</h2>
    <div class="grid grid-cols-2 gap-2">
      <nuxt-link
        :to="`/genre/${genre.id}`"
        v-for="genre in genres"
        :key="genre.id"
        :title="genre.name"
        class="mr-2 rounded px-3 py-2 mb-1 text-sm bg-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out"
        >{{ genre.name }}</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { genresQuery } from '@/queries/queries'
export default {
  apollo: {
    genres: {
      query: genresQuery
    }
  }
}
</script>

<style></style>
