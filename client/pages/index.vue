<template>
  <div class="container">
    <Search @search="handleSearchResults"/>
    <div v-for="movie in trending" :key="movie.id">
      <span>{{ movie.title }}</span>
      <span>{{ movie.id }}</span>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import { getTrendingQuery } from '@/queries/queries'
export default {
  apollo: {
    trending: getTrendingQuery
  },
  components: {
    Searchs
  },
  methords: {
    handleSearchResults() {

    }
  }
}
</script>

<style></style>
