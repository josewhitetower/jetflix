<template>
  <div class="container">
    <div v-for="movie in trending" :key="movie.id">
      <span>{{ movie.title }}</span>
      <span>{{ movie.id }}</span>
    </div>
  </div>
</template>

<script>
import { getTrendingQuery } from '@/queries/queries'
export default {
  apollo: {
    trending: getTrendingQuery
  },
  components: {}
}
</script>

<style></style>
