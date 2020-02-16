<template>
  <!-- <div v-if="$apollo.loading">Loading...</div>
  <div v-else-if="movie">
    <div>{{ movie.title }}</div>
    <img :src="movie.poster_path" alt="" />
  </div> -->
  <ApolloQuery
    :query="require('@/queries/queries').movieQuery"
    :variables="{ id: $route.params.id }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data" class="bg-blue-700 flex py-8 mx-auto">
        <img
          :src="src(data.movie.poster_path)"
          alt="Poster Image"
          :title="data.movie.title"
        />
        <div>
          <h1>
            {{ data.movie.title }} ({{ getYear(data.movie.release_date) }})
          </h1>
          <span>{{ data.movie.vote_average }}</span>
          <h2>Overview</h2>
          <p>{{ data.movie.overview }}</p>
          {{ data.movie.trailer }}
          <input type="checkbox" v-model="showTrailer" />
          <iframe
            class="max-w-xl w-full h-full"
            :src="data.movie.trailer"
            v-if="showTrailer"
          >
          </iframe>
        </div>
      </div>
      <!-- <div v-else>No result</div> -->
    </template>
  </ApolloQuery>
</template>

<script>
// import { movieQuery } from '@/queries/queries'
export default {
  data: () => ({
    showTrailer: false
  }),
  mounted() {
    this.$nuxt.$on('search', (data) => {
      this.$router.push(`/?search=${data}`)
    })
  },
  methods: {
    src(
      url = 'https://image.tmdb.org/t/p/w92/1DPUFG6QnGqzpvEaDEv7TaepycM.jpg'
    ) {
      const url342 = url.replace('/w500/', '/w185/')
      return url342
    },
    getYear(date) {
      return date.split('-')[0]
    }
  }
  // apollo: {
  //   movie: {
  //     query: movieQuery,
  //     variables() {
  //       return {
  //         id: this.$route.params.id
  //       }
  //     }
  //   }
  // }
}
</script>

<style></style>
