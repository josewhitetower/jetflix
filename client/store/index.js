import { auth } from 'firebase'

export const state = () => ({
  bookmarks: [],
  favorites: [],
  user: null
})

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
      } else {
        commit('setAuthUser', null)
      }
    } catch (error) {
      console.log(error)
    }
  },
  createUserWithEmailAndPassword: async (_, data) => {
    try {
      const { email, displayName, password } = data
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      )
      if (response.user) {
        await response.user.updateProfile({ displayName })
        return Promise.resolve()
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  signInWithEmailAndPassword: async (_, data) => {
    try {
      const { email, password } = data
      const response = await auth().signInWithEmailAndPassword(email, password)
      if (response.user) {
        return Promise.resolve()
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  signOut: async ({ commit }) => {
    try {
      return await auth()
        .signOut()
        .then(() => {
          return Promise.resolve()
        })
    } catch (error) {
      return Promise.reject(error)
    }
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
  },
  user: (state) => {
    return state.user
  }
}
