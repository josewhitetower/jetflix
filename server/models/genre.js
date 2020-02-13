const axios = require('../axios/axios')
const Genre = {
  findAll: () => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response) => response.data.genres)
      .catch((error) => ({ error: error }))
  },
  findById: (genreId) => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response) => {
        return response.data.genres.find((genre) => genre.id == genreId)
      })
      .catch((error) => ({ error: error }))
  }
}

module.exports = Genre
