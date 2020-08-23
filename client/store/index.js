import { auth, firestore } from 'firebase'

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
  },
  clearFavorites(state) {
    state.favorites = []
  },
  clearBookmarks(state) {
    state.bookmarks = []
  }
}

export const actions = {
  SET_AUTH_USER: async ({ commit }) => {
    try {
      const user = auth().currentUser
      if (user) {
        commit('setAuthUser', {
          id: user.uid,
          email: user.email,
          name: user.displayName
        })

        // get the favorites
        const favoritesRef = await firestore()
          .doc('/users/' + user.uid)
          .collection('favorites')
          .get()
        favoritesRef.docs.forEach((doc) => {
          commit('toggleFavorite', doc.data())
        })

        // get the bookmarks
        const bookmarksRef = await firestore()
          .doc('/users/' + user.uid)
          .collection('bookmarks')
          .get()
        bookmarksRef.docs.forEach((doc) => {
          commit('toggleBookmark', doc.data())
        })
      } else {
        commit('setAuthUser', null)
        commit('clearFavorites')
        commit('clearBookmarks')
      }
    } catch (error) {
      console.log(error)
    }
  },
  CREATE_USER_WITH_EMAIL_AND_PASSWORD: async (_, data) => {
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
  SIGN_IN_WITH_EMAIL_AND_PASSWORD: async (_, data) => {
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
  SIGN_OUT: async () => {
    try {
      return await auth()
        .signOut()
        .then(() => {
          return Promise.resolve()
        })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  TOGGLE_BOOKMARK: async ({ commit }, data) => {
    try {
      const user = auth().currentUser
      if (user) {
        const docRef = await firestore()
          .doc('/users/' + user.uid)
          .collection('bookmarks')
          .doc(data.id)
        const doc = await docRef.get()
        if (doc.exists) {
          docRef.delete()
        } else {
          docRef.set(data)
        }
        commit('toggleBookmark', data)
      }
    } catch (error) {
      return console.log(error)
    }
  },
  TOGGLE_FAVORITE: async ({ commit }, data) => {
    try {
      const user = auth().currentUser
      if (user) {
        const docRef = await firestore()
          .doc('/users/' + user.uid)
          .collection('favorites')
          .doc(data.id)
        const doc = await docRef.get()
        if (doc.exists) {
          docRef.delete()
        } else {
          docRef.set(data)
        }
        commit('toggleFavorite', data)
      }
    } catch (error) {
      return console.log(error)
    }
  },
  RESET_PASSWORD: async () => {
    try {
      const user = auth().currentUser
      return await auth()
        .sendPasswordResetEmail(user.email)
        .then(() => {
          return Promise.resolve()
        })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  DELETE_USER: async () => {
    try {
      const user = auth().currentUser
      return await user.delete().then(() => Promise.resolve())
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
