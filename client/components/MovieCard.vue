<template>
  <div class="group relative">
    <img
      :data-src="posterUrl"
      alt=""
      class="lazyload opacity-75 hover:opacity-100 transition duration-500 ease-in-out"
    />
    <div
      class="opacity-0 group-hover:opacity-100 absolute bottom-0 text-white bg-transparent w-full z-10 transition duration-500 ease-in-out flex-col p-2"
    >
      <p class="mb-1 font-semibold">{{ title }}</p>
      <Actions
        add-to-list
        favorites
        bookmark
        :id="movieIdd"
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
