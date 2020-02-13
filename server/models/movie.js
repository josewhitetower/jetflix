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
  },

  getTrailerVideo: (movieId) => {
    const trailerVideoUrl =`/movie/${movieId}/videos`
      return axios
      .get(trailerVideoUrl)
      .then((response) => {
        if (response.data.results[0] && response.data.results[0].key) {
          const trailerUrl = new URL('https://www.youtube.com/watch')
          trailerUrl.searchParams.set('v', response.data.results[0].key)
          return decodeURIComponent(trailerUrl.toString())
        }
        return ""
      })
      .catch((error) => (console.log(error)))
  },

  getCast:(movieId) => {
    const creditsUrl =`/movie/${movieId}/credits`
      return axios
      .get(creditsUrl)
      .then((response) => {
        return response.data.cast
      })
      .catch((error) => (console.log(error)))
  }
}

module.exports = Movie
