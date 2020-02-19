const axios = require('../axios/axios')
const Genre = {
  findAll: () => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response) => response.data.genres)
      .catch((error) => ({ error: error }))
  },
  findById: (genreId, page) => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response) => {
        const genre = response.data.genres.find((genre) => genre.id == genreId)
        genre.page = page
        return genre
      })
      .catch((error) => ({ error: error }))
  }
}

module.exports = Genre
