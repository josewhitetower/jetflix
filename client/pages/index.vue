<template>
  <div class="w-full">
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <MoviesList :movies="moviesList" />
    </div>
    <div class="mt-10">
      <nuxt-link
        :to="`/genre/${genre.id}`"
        v-for="genre in genres"
        :key="genre.id"
        class="block"
        >{{ genre.name }}</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { getTrendingQuery, searchQuery, genresQuery } from '@/queries/queries'
import MoviesList from '@/components/MoviesList.vue'

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
  components: {
    MoviesList
  },
  apollo: {
    genres: {
      query: genresQuery
    },
    trending: {
      query: getTrendingQuery,
      result(value) {
        this.moviesList = value.data.trending
        this.$nuxt.$emit('search:clear')
      },
      skip() {
        return this.$route.fullPath !== '/'
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
