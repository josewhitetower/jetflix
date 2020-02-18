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
  watch: {
    query(prev) {
      if (!prev) {
        this.$router.push('/')
      } else {
        this.handleSubmit()
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style></style>
