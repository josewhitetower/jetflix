export const state = () => ({
  bookmarks: [],
  favorites: []
})

export const mutations = {
  toggleBookmark(state, data) {
    const isBookmarked = !!state.bookmarks.find((bm) => bm.id === data.id)
    if (isBookmarked) {
      state.bookmarks = state.bookmarks.filter((bm) => bm.id !== data.id)
    } else {
      state.bookmarks.push(data)
    }
  },
  toggleFavorite(state, data) {
    const isFavorited = !!state.favorites.find((fv) => fv.id === data.id)
    if (isFavorited) {
      state.favorites = state.favorites.filter((fv) => fv.id !== data.id)
    } else {
      state.favorites.push(data)
    }
  }
}

export const getters = {
  isBookmarked: (state) => (id) => {
    return !!state.bookmarks.find((bm) => bm.id === id)
  },
  isFavorited: (state) => (id) => {
    return !!state.favorites.find((fv) => fv.id === id)
  }
}
