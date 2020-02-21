<template>
  <div>
    <h1 class="mb-8 font-bold">Favorites</h1>
    <MoviesList :movies="favorites" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MoviesList from '@/components/MoviesList.vue'
export default {
  components: {
    MoviesList
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites'
    })
  }
}
</script>

<style></style>
