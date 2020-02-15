<template>
  <div v-if="$apollo.loading">Loading...</div>
  <div v-else-if="movie">
    <div>{{ movie.title }}</div>
    <img :src="movie.poster_path" alt="" />
  </div>
</template>

<script>
import { movieQuery } from '@/queries/queries'
export default {
  data: () => ({
    movie: null
  }),
  apollo: {
    movie: {
      query: movieQuery,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>

<style></style>
