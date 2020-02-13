const axios = require('../axios/axios')
const Movie = {
  trending: () => {
    const trendingUrl = `/trending/all/day`
    return axios
      .get(trendingUrl)
      .then((response) => response.data.results)
      .catch((error) => ({ error: error }))
  },

  findById: (movieId) => {
    const movieUrl = `/movie/${movieId}`
    return axios
      .get(movieUrl)
      .then((response) => response.data)
      .catch((error) => ({ error: error }))
  },

  findByGenreId: (genreId) => {
    const discoverUrl = `/discover/movie/?with_genres=${genreId}`
    return axios
      .get(discoverUrl)
      .then((response) => response.data.results)
      .catch((error) => ({ error: error }))
  }
}

module.exports = Movie
