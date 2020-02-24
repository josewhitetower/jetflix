<template>
  <form class="my-12 relative" @submit.prevent="handleSubmit">
    <!-- using @input instead of value because on mobile the watcher on query
    is not detected see: https://github.com/vuejs/vue/issues/8231 -->
    <input
      :value="query"
      type="text"
      class="block rounded p-2 w-full bg-gray-900"
      placeholder="Search movies..."
      @input="(e) => (query = e.target.value)"
    />
    <font-awesome-icon
      v-if="query"
      class="absolute right-0 top-0 mt-3 mr-3 cursor-pointer text-lg"
      :icon="['fas', 'times']"
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
