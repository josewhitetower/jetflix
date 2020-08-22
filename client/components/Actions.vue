<template>
  <div class="flex items-center text-xs">
    <span
      v-if="favorites && user"
      :class="{ 'bg-white text-gray-900': isFavorited }"
      class="w-6 h-6 md:h-8 md:w-8 border-2 md:hover:bg-white cursor-pointer md:hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Mark as favorite"
      @click="onFavoriteClick"
    >
      <font-awesome-icon :icon="['fas', 'heart']" />
    </span>
    <span
      v-if="bookmark && user"
      :class="{ 'bg-white text-gray-900': isBookmarked }"
      class="w-6 h-6 md:h-8 md:w-8 border-2 md:hover:bg-white cursor-pointer md:hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Bookmark"
      @click="onBookmarkClick"
    >
      <font-awesome-icon :icon="['fas', 'bookmark']" />
    </span>
    <span
      v-if="share"
      class="w-6 h-6 md:h-8 md:w-8 border-2 hover:bg-white cursor-pointer hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Share"
      @click="onShareClick"
    >
      <font-awesome-icon :icon="['fas', 'share-alt']" />
    </span>
    <span
      v-if="trailer"
      class="cursor-pointer hover:underline"
      title="Watch Trailer"
      @click="$emit('showTrailer')"
    >
      <font-awesome-icon :icon="['fas', 'play']" class="mx-2" />
      <span class="">Watch Trailer</span>
    </span>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: {
    favorites: {
      type: Boolean,
      default: () => false
    },
    bookmark: {
      type: Boolean,
      default: () => false
    },
    share: {
      type: Boolean,
      default: () => false
    },
    trailer: {
      type: String,
      default: () => ''
    },
    movieId: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    },
    posterPath: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapGetters({
      isBookmarkedGetter: 'isBookmarked',
      isFavoritedGetter: 'isFavorited',
      user: 'user'
    }),
    isBookmarked() {
      return this.isBookmarkedGetter(this.movieId)
    },
    isFavorited() {
      return this.isFavoritedGetter(this.movieId)
    }
  },
  methods: {
    ...mapMutations({
      toggleFavorite: 'toggleFavorite'
    }),
    ...mapActions({
      toggleBookmark: 'toggleBookmark'
    }),
    onBookmarkClick() {
      this.toggleBookmark({
        id: this.movieId,
        title: this.title
      })
    },
    onFavoriteClick() {
      this.toggleFavorite({
        id: this.movieId,
        title: this.title,
        poster_path: this.posterPath
      })
    },
    onShareClick() {
      const dummy = document.createElement('input')
      const text = window.location.href

      document.body.appendChild(dummy)
      dummy.value = text
      dummy.select()
      dummy.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      document.body.removeChild(dummy)
      alert(`Copied to clipboard!`)
    }
  }
}
</script>

<style></style>
