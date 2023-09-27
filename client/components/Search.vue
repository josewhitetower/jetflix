<template>
  <form class="my-12 relative" @submit.prevent="handleSubmit">
    <!-- using @input instead of v-model because on mobile the watcher on query
    is not detected see: https://github.com/vuejs/vue/issues/8231 -->
    <label
      for="search"
      class="mb-2 px-2 transform inline-block transition duration-75 ease-in-out"
      :class="[query ? 'opacity-100' : 'opacity-0']"
      >Search movies...</label
    >
    <input
      id="search"
      type="text"
      class="block rounded p-2 w-full bg-gray-900"
      placeholder="Search movies..."
      :value="query"
      @input="(e) => (query = e.target.value)"
    />
    <font-awesome-icon
      v-if="query"
      class="absolute right-0 bottom-0 mb-3 mr-3 cursor-pointer text-lg"
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
      this.$router.push({ path: '/', query: { search: this.query }, page: 1})
    }
  }
}
</script>

<style></style>
