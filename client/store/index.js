import { auth } from 'firebase'

export const state = () => ({
  bookmarks: [],
  favorites: [],
  user: null
})

// I chose to not use actions because there's no ayncronous operation here
// state cmutate directly
// https://vuex.vuejs.org/guide/actions.html
// https://vuex.vuejs.org/guide/mutations.html
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
  },
  setAuthUser(state, user) {
    state.user = user
  }
}

export const actions = {
  setAuthUser: ({ commit }) => {
    try {
      const user = auth().currentUser
      if (user) {
        commit('setAuthUser', {
          id: user.uid,
          email: user.email,
          name: user.displayName
        })
      }
    } catch (error) {}
  }
}

export const getters = {
  isBookmarked: (state) => (id) => {
    return !!state.bookmarks.find((bm) => bm.id === id)
  },
  isFavorited: (state) => (id) => {
    return !!state.favorites.find((fv) => fv.id === id)
  },
  favorites: (state) => {
    return state.favorites
  },
  bookmarks: (state) => {
    return state.bookmarks
  }
}
