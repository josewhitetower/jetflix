<template>
  <div class="w-full">
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
import { mapGetters } from 'vuex'
import { getTrendingQuery, searchQuery, genresQuery } from '@/queries/queries'
import MoviesList from '@/components/MoviesList.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    MoviesList,
    Pagination
  },
  computed: {
    querySearch() {
      return this.$route.query.search
    },
    ...mapGetters({
      user: 'user'
    })
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
    page() {
      this.$router.push({
        query: { search: this.querySearch, page: this.page }
      })
    }
  },
  mounted() {
    this.page = this.$route.query.page ? Number(this.$route.query.page) : 0
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
      },
      skip() {
        return this.$route.fullPath !== '/'
      }
    },
    search: {
      query: searchQuery,
      variables() {
        return { query: this.querySearch, page: Number(this.$route.query.page) ?? 1 }
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
