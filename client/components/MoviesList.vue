<template>
  <ul
    class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mx-auto"
  >
    <li v-for="movie in movies" :key="movie.id" class="">
      <nuxt-link :to="`/movie/${movie.id}`" class="block" :title="movie.title">
        <MovieCard
          :posterUrl="imageSource(movie.poster_path)"
          :title="movie.title"
        ></MovieCard>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
export default {
  props: {
    movies: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    imageSource(url) {
      if (url) {
        return url
      }
      return 'https://via.placeholder.com/294x430'
    }
  },
  components: {
    MovieCard
  }
}
</script>

<style></style>
