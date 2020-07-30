<template>
  <ApolloQuery
    :query="require('@/queries/queries').movieQuery"
    :variables="{ id: $route.params.id }"
    @result="onResult"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data" class="bg-gray-900 py-8 mx-auto px-3">
        <div class="flex flex-col lg:flex-row relative justify-center">
          <img
            v-if="data.movie.poster_path"
            :src="data.movie.poster_path"
            width="500"
            height="750"
            alt="Poster Image"
            class="w-full lg:w-auto lg:mr-4 bg-gray-900"
            :title="data.movie.title"
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
              v-if="data.movie.runtime"
              class="text-gray-500 mb-4 inline-block"
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
              :poster-path="data.movie.poster_path"
              class="mb-8"
              @showTrailer="showTrailer = true"
            />
            <h2 class="font-semibold">{{ data.movie.tagline }}</h2>

            <p class="text-sm leading-6 mb-4">{{ data.movie.overview }}</p>
            <div v-if="data.movie.cast.length" class="mb-6">
              <span class="text-gray-500 mb-2 inline-block">
                Cast:
              </span>
              <div class="flex px-4">
                <img
                  v-for="cast in data.movie.cast"
                  :key="cast.id"
                  :src="`https://image.tmdb.org/t/p/w92${cast.profile_path}`"
                  alt=""
                  class="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover border-2 -ml-3 cursor-pointer flex-shrink-0 bg-gray-900"
                  :title="castName(cast)"
                />
              </div>
            </div>
            <div v-if="data.movie.genres.length">
              <span class="text-gray-500 mb-2 inline-block">
                Genre(s):
              </span>
              <div class="mb-10 flex flex-wrap">
                <nuxt-link
                  v-for="genre in data.movie.genres"
                  :key="genre.id"
                  :to="`/genre/${genre.id}`"
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
    </template>
  </ApolloQuery>
</template>

<script>
import Actions from '@/components/Actions'
import Trailer from '@/components/Trailer'
export default {
  components: {
    Actions,
    Trailer
  },
  head() {
    return {
      title: this.title
    }
  },
  data: () => ({
    showTrailer: false,
    title: ''
  }),
  methods: {
    getYear(date) {
      return date.split('-')[0]
    },
    castName(cast) {
      return `${
        cast.character ? `${cast.name} (${cast.character})` : cast.name
      }`
    },
    onResult(result) {
      this.title =
        result && result.data && result.data.movie && result.data.movie.title
          ? result.data.movie.title
          : ''
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
