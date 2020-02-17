<template>
  <!-- <div v-if="$apollo.loading">Loading...</div>
  <div v-else-if="movie">
    <div>{{ movie.title }}</div>
    <img :src="movie.poster_path" alt="" />
  </div>-->
  <ApolloQuery
    :query="require('@/queries/queries').movieQuery"
    :variables="{ id: $route.params.id }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data" class="bg-gray-900 py-8 mx-auto px-3">
        <div class="flex flex-col lg:flex-row relative justify-center">
          <img
            :src="data.movie.poster_path"
            alt="Poster Image"
            class="w-full lg:w-auto lg:mr-4"
            :title="data.movie.title"
            v-if="data.movie.poster_path"
          />
          <div class="bg-transparent p-3">
            <h1 class="text-xl flex items-center mt-2 ">
              <span class="mr-4 font-bold">
                {{ data.movie.title }} ({{ getYear(data.movie.release_date) }})
              </span>
              <div
                class="h-10 w-10 flex items-center justify-center rounded-full block text-base border-2 flex-shrink-0"
              >
                {{ data.movie.vote_average }}
              </div>
            </h1>
            <span
              class="text-gray-500 mb-4 inline-block"
              v-if="data.movie.runtime"
            >
              Length: {{ data.movie.runtime }}h
            </span>
            <Actions
              add-to-list
              favorites
              bookmark
              share
              :trailer="data.movie.trailer"
              :id="data.movie.id"
              class="mb-8"
              @showTrailer="showTrailer = true"
            />
            <p class="text-sm leading-6 mb-4">{{ data.movie.overview }}</p>
            <div>
              <span class="text-gray-500 mb-2 inline-block">
                Genre(s):
              </span>
              <div class="mb-10 flex flex-wrap">
                <nuxt-link
                  :to="`/genre/${genre.id}`"
                  v-for="genre in data.movie.genres"
                  :key="genre.id"
                  :title="genre.name"
                  class="mr-2 rounded px-3 py-2 mb-1 text-sm bg-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out"
                  >{{ genre.name }}</nuxt-link
                >
              </div>
            </div>
          </div>
          <Trailer
            v-if="showTrailer"
            :trailer-url="data.movie.trailer"
            @close="showTrailer = false"
          />
        </div>
      </div>
      <!-- <div v-else>No result</div> -->
    </template>
  </ApolloQuery>
</template>

<script>
// import { movieQuery } from '@/queries/queries'
import Actions from '@/components/Actions'
import Trailer from '@/components/Trailer'
export default {
  data: () => ({
    showTrailer: false
  }),
  components: {
    Actions,
    Trailer
  },
  mounted() {
    this.$nuxt.$on('search', (value) => {
      this.$router.push(`/?search=${value}`)
    })
    this.$nuxt.$emit('search:clear')
  },
  methods: {
    src(
      url = 'https://image.tmdb.org/t/p/w92/1DPUFG6QnGqzpvEaDEv7TaepycM.jpg'
    ) {
      const url342 = url.replace('/w500/', '/w342/')
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
