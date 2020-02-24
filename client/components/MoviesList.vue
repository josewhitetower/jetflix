<template>
  <ul
    class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mx-auto"
  >
    <li v-for="movie in movies" :key="movie.id">
      <MovieCard
        :poster-url="movie.poster_path"
        :title="movie.title"
        :movie-id="movie.id"
      ></MovieCard>
    </li>
  </ul>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
export default {
  components: {
    MovieCard
  },
  props: {
    movies: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
