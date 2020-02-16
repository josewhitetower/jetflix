<template>
  <div class="w-full">
    <div class="mb-10 flex flex-wrap">
      <nuxt-link
        :to="`/genre/${genre.id}`"
        v-for="genre in genres"
        :key="genre.id"
        :title="genre.title"
        class="mr-2 rounded px-3 py-2 mb-1 text-sm bg-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out"
        >{{ genre.name }}</nuxt-link
      >
    </div>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <h1>{{ title }}</h1>
      <MoviesList :movies="moviesList" />
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
      searchQuery: '',
      title: ''
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
        this.title = 'Trending'
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
        this.title = `Search results: ${this.searchQuery}`
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
