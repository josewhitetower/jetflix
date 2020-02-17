<template>
  <div class="flex items-center text-xs">
    <span
      class="h-8 w-8 border-2 hover:bg-white cursor-pointer hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Add to list"
      v-if="addToList"
    >
      <font-awesome-icon :icon="['fas', 'list-ul']" />
    </span>
    <span
      class="h-8 w-8 border-2 hover:bg-white cursor-pointer hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Mark as favorite"
      v-if="favorites"
    >
      <font-awesome-icon :icon="['fas', 'heart']" />
    </span>
    <span
      class="h-8 w-8 border-2 hover:bg-white cursor-pointer hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
      title="Bookmark"
      v-if="bookmark"
    >
      <font-awesome-icon :icon="['fas', 'bookmark']" />
    </span>
    <span
      class="h-8 w-8 border-2 hover:bg-white cursor-pointer hover:text-gray-900 rounded-full mr-2 flex items-center justify-center"
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
export default {
  props: {
    addToList: {
      type: Boolean,
      default: () => false
    },
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
    }
  }
}
</script>

<style></style>
