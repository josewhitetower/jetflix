<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="query" type="text" />
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
