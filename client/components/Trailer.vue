<template>
  <div class="h-full fixed inset-0 w-full z-10 bg-transparent">
    <div class="h-full pb-64 relative">
      <button @click="$emit('close')">close</button>
      <div v-if="loading">Loading...</div>

      <iframe
        @load="loading = false"
        class="mt-20 mx-auto w-full lg:w-8/12 h-full py-20"
        :src="trailerUrl"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trailerUrl: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    loading: true
  })
}
</script>

<style></style>
