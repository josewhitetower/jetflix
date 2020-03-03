<template>
  <div class="w-full">
    <div class="mb-10 transform z-20 pb-3 hidden md:block">
      <div class=" flex flex-wrap">
        <nuxt-link
          v-for="genre in genres"
          :key="genre.id"
          :to="`/genre/${genre.id}`"
          :title="genre.name"
          class="mr-2 rounded px-3 py-2 mb-1 text-sm bg-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out"
          >{{ genre.name }}</nuxt-link
        >
      </div>
    </div>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <h1 class="mb-8 font-bold">{{ title }}</h1>
      <MoviesList :movies="moviesList" />
      <Pagination
        v-if="total_pages"
        :page="page"
        :total-pages="total_pages"
        @prev="page--"
        @next="page++"
      />
    </div>
  </div>
</template>

<script>
import { getTrendingQuery, searchQuery, genresQuery } from '@/queries/queries'
import MoviesList from '@/components/MoviesList.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    MoviesList,
    Pagination
  },
  asyncData(context) {
    const client = context.app.apolloProvider.defaultClient
    return client.query({ query: getTrendingQuery }).then(({ data }) => {
      return { moviesList: data.trending ? data.trending : [] }
    })
  },
  computed: {
    querySearch() {
      return this.$route.query.search
    }
  },
  data() {
    return {
      moviesList: [],
      searchQuery: '',
      title: '',
      total_pages: 0,
      page: 0,
      toggleGenres: false
    }
  },
  watch: {
    // $route() {
    //   this.searchQuery = this.$route.query.search
    // },
    page() {
      this.$router.push({
        query: { search: this.querySearch, page: this.page }
      })
    }
  },
  mounted() {
    // this.searchQuery = this.$route.query.search
    this.page = this.$route.query.page ? Number(this.$route.query.page) : 0
  },

  apollo: {
    genres: {
      query: genresQuery
    },
    // trending: {
    //   query: getTrendingQuery,
    //   result(value) {
    //     this.moviesList = value.data.trending
    //     this.title = 'Trending'
    //   },
    //   skip() {
    //     return this.$route.fullPath !== '/'
    //   }
    // },
    search: {
      query: searchQuery,
      variables() {
        return { query: this.querySearch, page: Number(this.$route.query.page) }
      },
      result(value) {
        this.moviesList = value.data.search.results
        this.total_pages = value.data.search.total_pages
        this.page = value.data.search.page
        this.title = `Search results: ${this.querySearch}`
      },
      skip() {
        return !this.querySearch
      }
    }
  }
}
</script>

<style></style>
