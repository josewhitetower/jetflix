<template>
  <div class="w-full">
    <ApolloQuery
      :query="require('@/queries/queries').genreQuery"
      :variables="{ id: $route.params.id, page: page }"
      @result="onResult"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="data && data.genre">
          <h1 class="mb-8 font-bold">{{ data.genre.name }}</h1>

          <MoviesList :movies="data.genre.movies" />
          <Pagination
            :page="data.genre.page"
            :total-pages="+data.genre.total_pages"
            @prev="page--"
            @next="page++"
          />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    MoviesList,
    Pagination
  },
  head() {
    return {
      title: this.title
    }
  },
  data: () => ({
    page: 1,
    title: ''
  }),
  watch: {
    page() {
      this.$router.push({ query: { page: this.page } })
    }
  },
  mounted() {
    this.page = Number(this.$route.query.page) || 1
  },
  methods: {
    onResult(result) {
      console.log({ result })
      this.title =
        result && result.data && result.data.genre && result.data.genre.name
          ? result.data.genre.name
          : ''
    }
  }
}
</script>

<style></style>
