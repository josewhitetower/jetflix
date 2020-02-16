<template>
  <ApolloQuery
    :query="require('@/queries/queries').genreQuery"
    :variables="{ id: $route.params.id }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data && data.genre">
        <h1>{{ data.genre.name }}</h1>
        <nuxt-link
          :to="`/movie/${movie.id}`"
          v-for="movie in data.genre.movies"
          :key="movie.id"
          class="block"
        >
          {{ movie.title }}
        </nuxt-link>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
export default {}
</script>

<style></style>
