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
              favorites
              bookmark
              share
              :trailer="data.movie.trailer"
              :movie-id="data.movie.id"
              :title="data.movie.title"
              class="mb-8"
              @showTrailer="showTrailer = true"
            />
            <h2 class="font-semibold">{{ data.movie.tagline }}</h2>

            <p class="text-sm leading-6 mb-4">{{ data.movie.overview }}</p>
            <div class="mb-6" v-if="data.movie.cast.length">
              <span class="text-gray-500 mb-2 inline-block">
                Cast:
              </span>
              <div class="flex px-4">
                <img
                  :src="`https://image.tmdb.org/t/p/w92${cast.profile_path}`"
                  alt=""
                  v-for="cast in data.movie.cast"
                  :key="cast.id"
                  class="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover border-2 -ml-3 cursor-pointer flex-shrink-0"
                  :title="`${cast.name} (${cast.character})`"
                />
              </div>
            </div>
            <div v-if="data.movie.genres.length">
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
