<template>
  <div
    :class="isScrolled"
    class="container fixed left-0 mx-auto pb-5 px-6 right-0 top-0 z-20 pt-5 bg-black flex"
  >
    <nuxt-link to="/" class="mr-3">Home</nuxt-link>
    <div class="relative">
      <span @click="showBookmarks = !showBookmarks" class="cursor-pointer mr-3"
        >Bookmarks ({{ bookmarks.length }})</span
      >
      <ul
        :class="[showBookmarks ? 'opacity-100 visible' : 'opacity-0 invisible']"
        class="border border-gray-900 p-2 rounded-md transition duration-500 ease-in-out absolute bg-transparent overflow-auto w-56"
        v-if="bookmarks.length"
        style="max-height: 300px"
      >
        <li
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          class="cursor-pointer hover:underline p-2"
        >
          <span @click="() => onBookmarkClick(bookmark.id)">
            {{ bookmark.title }}
          </span>
        </li>
      </ul>
    </div>
    <nuxt-link to="/favorites" class="cursor-pointer mr-3">Favorites</nuxt-link>
    <nuxt-link to="/genres" class="cursor-pointer mr-3 md:hidden"
      >Genres</nuxt-link
    >
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
      showBookmarks: false,
      showGenres: false
    }
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites',
      bookmarks: 'bookmarks'
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
    onBookmarkClick(id) {
      this.showBookmarks = false
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style></style>
