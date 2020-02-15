<template>
  <div class="container">
    <Search @search="handleSearchResults" />
    <div v-for="movie in moviesList" :key="movie.id">
      <span>{{ movie.title }}</span>
      <span>{{ movie.id }}</span>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import { getTrendingQuery, searchQuery } from '@/queries/queries'
export default {
  data() {
    return {
      moviesList: [],
      searchQuery: ''
    }
  },
  apollo: {
    trending: {
      query: getTrendingQuery,
      result(value) {
        this.moviesList = value.data.trending
      }
    },
    search: {
      query: searchQuery,
      variables() {
        return { query: this.searchQuery }
      },
      result(value) {
        this.moviesList = value.data.search
      },
      skip() {
        return !this.searchQuery
      }
    }
  },
  components: {
    Search
  },
  methods: {
    handleSearchResults(value) {
      this.searchQuery = value
      console.log(value)
    }
  }
}
</script>

<style></style>
