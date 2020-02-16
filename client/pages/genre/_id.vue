<template>
  <div class="container mx-auto px-4">
    <ApolloQuery
      :query="require('@/queries/queries').genreQuery"
      :variables="{ id: $route.params.id }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="data && data.genre">
          <h1>{{ data.genre.name }}</h1>
          <MoviesList :movies="data.genre.movies" />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue'
export default {
  components: {
    MoviesList
  }
}
</script>

<style></style>
