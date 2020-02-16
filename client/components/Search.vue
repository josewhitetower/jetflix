<template>
  <form @submit.prevent="handleSubmit" class="my-12">
    <input
      v-model="query"
      type="text"
      class="block rounded p-2 w-full bg-gray-900"
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
