<template>
  <form @submit.prevent="handleSubmit" class="mb-12">
    <input
      v-model="query"
      type="text"
      class="block border p-2 w-full"
      placeholder="Search movies.."
    />
  </form>
</template>

<script>
export default {
  data: () => ({
    query: ''
  }),
  mounted() {
    this.$nuxt.$on('search:clear', () => {
      this.query = ''
    })
  },
  methods: {
    handleSubmit() {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style></style>
