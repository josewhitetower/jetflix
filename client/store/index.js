export const state = () => ({
  bookmarks: []
})

export const mutations = {
  toggleBookmark(state, data) {
    state.bookmarks.push(data)
  }
}
