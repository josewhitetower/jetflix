<template>
  <div class="h-full fixed inset-0 w-full z-10 bg-transparent overflow-auto">
    <div
      class="h-0 relative pt-10 mt-40 md:mt-20 container mx-auto"
      style="padding-bottom:52.25%"
    >
      <span
        class="-m-10 absolute bg-black mr-5 hover:bg-white cursor-pointer hover:text-gray-900 right-0 text-xs border rounded-sm py-1 px-2"
        title="Close"
        @click="$emit('close')"
      >
        Close X
      </span>
      <div v-if="loading">Loading...</div>

      <iframe
        :src="trailerUrl"
        class="md:pb-64 lg:pb-64 absolute block left-0 mx-auto right-0 w-full h-full max-w-4xl"
        allowfullscreen
        frameborder="0"
        width="1090"
        height="612"
        @load="loading = false"
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
  }),
  mounted() {
    window.addEventListener('keydown', this.onKeyEscape)
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeyEscape)
  },
  methods: {
    onKeyEscape() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
