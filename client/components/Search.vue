<template>
  <form @submit.prevent="handleSubmit" class="my-12 relative">
    <input
      :value="searchQuery"
      @input="(e) => (searchQuery = e.target.value)"
      type="text"
      class="block rounded p-2 w-full bg-gray-900"
      placeholder="Search movies..."
    />
    <font-awesome-icon
      :icon="['fas', 'times']"
      v-if="query"
      class="absolute right-0 top-0 mt-3 mr-3 cursor-pointer text-lg"
      @click="query = ''"
    />
  </form>
</template>

<script>
export default {
  data: () => ({
    query: ''
  }),
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
      this.$router.push({ path: '/', query: { search: this.query } })
    }
  }
}
</script>

<style></style>
