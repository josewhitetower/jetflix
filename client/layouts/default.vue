<template>
  <div>
    <Search @search="onSearch" />
    <nuxt />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  components: {
    Search
  },
  methods: {
    onSearch(value) {
      if (value) {
        this.$router.push(`/?search=${value}`)
        this.$nuxt.$emit('search', value)
      }
    }
  }
}
</script>

<style></style>
