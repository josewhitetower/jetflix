<template>
  <div class="h-full fixed inset-0 w-full z-10 bg-transparent overflow-auto">
    <div class="h-0 relative pt-10" style="padding-bottom:52.25%">
      <button @click="$emit('close')">close</button>
      <div v-if="loading">Loading...</div>

      <iframe
        @load="loading = false"
        frameborder="0"
        width="1090"
        height="612"
        allowfullscreen
        class="md:pb-64 lg:pb-64 absolute block left-0 mx-auto right-0 w-full h-full max-w-4xl"
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
  }),
  mounted() {
    window.addEventListener('keydown', this.onKeyEscape)
  },
  methods: {
    onKeyEscape() {
      this.$emit('close')
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeyEscape)
  }
}
</script>

<style></style>
