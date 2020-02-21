<template>
  <div
    :class="isScrolled"
    class="container fixed left-0 mx-auto pb-5 px-6 right-0 top-0 z-20 pt-5 bg-black"
  >
    <nuxt-link to="/" class="mr-3">Home</nuxt-link>
    <span @click="showFavorites = !showFavorites" class="cursor-pointer mr-3"
      >Favorites ({{ favorites.length }})</span
    >
    <nuxt-link to="/genres" class="cursor-pointer mr-3 md:hidden"
      >Genres</nuxt-link
    >
    <ul
      :class="[showFavorites ? 'opacity-100 visible' : 'opacity-0 invisible']"
      class="border border-gray-900 p-2 rounded-md transition duration-500 ease-in-out absolute bg-transparent text-center overflow-auto"
      style="max-height: 300px"
    >
      <li
        v-for="favorite in favorites"
        :key="favorite.id"
        class="cursor-pointer hover:underline p-2"
      >
        <span @click="() => onFavoriteClick(favorite.id)">
          {{ favorite.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      view: {
        isAtTopOfPage: true
      },
      showFavorites: false,
      showGenres: false
    }
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites'
    }),
    isScrolled() {
      return !this.view.isAtTopOfPage && 'border-b border-gray-900'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // the function to call when the user scrolls, added as a method
    handleScroll() {
      // when the user scrolls, check the pageYOffset
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (this.view.isAtTopOfPage) this.view.isAtTopOfPage = false
      } else if (!this.view.isAtTopOfPage) this.view.isAtTopOfPage = true
      // user is at top of page
    },
    onFavoriteClick(id) {
      this.showFavorites = false
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style></style>
