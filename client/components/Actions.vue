<template>
  <div class="flex items-center text-xs">
    <span
      :class="{ 'bg-white text-gray-900': isFavorited }"
      class="w-6 h-6 md:h-8 md:w-8 border-2 md:hover:bg-white cursor-pointer md:hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Mark as favorite"
      v-if="favorites"
      @click="onFavoriteClick"
    >
      <font-awesome-icon :icon="['fas', 'heart']" />
    </span>
    <span
      :class="{ 'bg-white text-gray-900': isBookmarked }"
      class="w-6 h-6 md:h-8 md:w-8 border-2 md:hover:bg-white cursor-pointer md:hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Bookmark"
      v-if="bookmark"
      @click="onBookmarkClick"
    >
      <font-awesome-icon :icon="['fas', 'bookmark']" />
    </span>
    <span
      class="w-6 h-6 md:h-8 md:w-8 border-2 hover:bg-white cursor-pointer hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Share"
      v-if="share"
    >
      <font-awesome-icon :icon="['fas', 'share-alt']" />
    </span>
    <span
      @click="$emit('showTrailer')"
      v-if="trailer"
      class="cursor-pointer hover:underline"
      title="Watch Trailer"
    >
      <font-awesome-icon :icon="['fas', 'play']" class="mx-2" />
      <span class="">Watch Trailer</span>
    </span>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
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
    posterUrl: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapGetters({
      isBookmarkedGetter: 'isBookmarked',
      isFavoritedGetter: 'isFavorited'
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
      toggleBookmark: 'toggleBookmark',
      toggleFavorite: 'toggleFavorite'
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
        posterUrl: this.posterUrl
      })
    }
  }
}
</script>

<style></style>
