<template>
  <div
    :class="isScrolled"
    class="container fixed left-0 mx-auto pb-5 px-6 right-0 top-0 z-20 pt-5 bg-black flex justify-between"
  >
    <div class="flex">
      <nuxt-link to="/" class="mr-3">Jetlfix</nuxt-link>
      <div class="relative" v-if="user">
        <span
          class="cursor-pointer mr-3"
          @click="showBookmarks = !showBookmarks"
          >Bookmarks ({{ bookmarks.length }})</span
        >
        <ul
          v-if="bookmarks.length"
          :class="[
            showBookmarks ? 'opacity-100 visible' : 'opacity-0 invisible'
          ]"
          class="border border-gray-900 p-2 rounded-md transition duration-500 ease-in-out absolute bg-transparent overflow-auto w-56"
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
      <nuxt-link v-if="user" to="/favorites" class="cursor-pointer mr-3"
        >Favorites</nuxt-link
      >
      <nuxt-link v-if="user" to="/genres" class="cursor-pointer mr-3 md:hidden"
        >Genres</nuxt-link
      >
    </div>
    <div class="flex" v-if="!user">
      <nuxt-link to="/signup" class="cursor-pointer mr-3">
        <span title="Sign up">
          <span class="hidden lg:inline">Sign up</span>
          <font-awesome-icon
            :icon="['fas', 'user-plus']"
            class="lg:hidden"
          /> </span
      ></nuxt-link>
      <nuxt-link to="/signin" class="cursor-pointer mr-3">
        <span title="Sign in">
          <span class="hidden lg:inline">Sign in</span>
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="lg:hidden" />
        </span>
      </nuxt-link>
    </div>
    <div v-if="user" class="relative">
      <span
        class="cursor-pointer mr-3"
        title="Admin"
        @click="showAdmin = !showAdmin"
      >
        <span class="hidden lg:inline">Admin</span>
        <font-awesome-icon :icon="['fas', 'user']" class="lg:hidden" />
      </span>
      <Admin
        :user="user"
        @sign-out="signOut"
        :class="[showAdmin ? 'opacity-100 visible' : 'opacity-0 invisible']"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Admin from './Admin'
export default {
  components: {
    Admin
  },
  data() {
    return {
      view: {
        isAtTopOfPage: true
      },
      showBookmarks: false,
      showAdmin: false,
      showGenres: false
    }
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites',
      bookmarks: 'bookmarks',
      user: 'user'
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
    },
    signOut() {
      this.$store
        .dispatch('SIGN_OUT')
        .then(() => (this.showAdmin = false && this.$router.push('/')))
    }
  }
}
</script>

<style></style>
