<template>
  <div
    class="group relative md:transform hover:scale-110 transition duration-500 ease-in-out"
  >
    <nuxt-link :to="`/movie/${movieId}`" class="block" :title="title">
      <img
        :data-src="posterUrl"
        alt=""
        class="lazyload opacity-75 group-hover:opacity-100"
      />
    </nuxt-link>
    <div
      class="opacity-0 group-hover:opacity-100 absolute bottom-0 text-white bg-transparent w-full z-10 transition duration-500 ease-in-out flex-col p-2"
    >
      <p class="mb-1 font-semibold text-sm">{{ title }}</p>
      <Actions
        favorites
        bookmark
        :title="title"
        :movie-id="movieId"
        class="justify-end"
      />
    </div>
  </div>
</template>

<script>
import Actions from '@/components/Actions'
export default {
  components: {
    Actions
  },
  props: {
    posterUrl: {
      type: String,
      default: () => ''
    },
    movieId: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style></style>
