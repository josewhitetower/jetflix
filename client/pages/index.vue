<template>
  <div class="container">
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <nuxt-link
        :to="`/movie/${movie.id}`"
        v-for="movie in moviesList"
        :key="movie.id"
        class="block"
      >
        <span>{{ movie.title }}</span>
        <span>{{ movie.id }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getTrendingQuery, searchQuery } from '@/queries/queries'
export default {
  data() {
    return {
      moviesList: [],
      searchQuery: ''
    }
  },
  mounted() {
    this.$nuxt.$on('search', (data) => {
      this.searchQuery = data
    })
    this.searchQuery = this.$route.query.search
  },
  apollo: {
    trending: {
      query: getTrendingQuery,
      result(value) {
        this.moviesList = value.data.trending
      },
      skip() {
        return this.$route.path !== '/'
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

  methods: {
    handleSearchResults(value) {
      this.searchQuery = value
    }
  }
}
</script>

<style></style>
