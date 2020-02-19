const axios = require('../axios/axios')
const Movie = {
  trending: () => {
    const trendingUrl = `/trending/movie/day`
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

  findByGenreId: (genreId, page = 1) => {
    const discoverUrl = `/discover/movie/?with_genres=${genreId}&page=${page}`
    return axios
      .get(discoverUrl)
      .then((response) => response.data.results)
      .catch((error) => ({ error: error }))
  },

  findPageByGenreId: (genreId, page = 1) => {
    const discoverUrl = `/discover/movie/?with_genres=${genreId}&page=${page}`
    return axios
      .get(discoverUrl)
      .then((response) => response.data.page)
      .catch((error) => ({ error: error }))
  },

  findTotalPagesByGenreId: (genreId, page = 1) => {
    const discoverUrl = `/discover/movie/?with_genres=${genreId}&page=${page}`
    return axios
      .get(discoverUrl)
      .then((response) => response.data.total_pages)
      .catch((error) => ({ error: error }))
  },

  getTrailerVideo: (movieId) => {
    const trailerVideoUrl = `/movie/${movieId}/videos`
    return axios
      .get(trailerVideoUrl)
      .then((response) => {
        if (response.data.results[0] && response.data.results[0].key) {
          const trailerUrl = new URL(
            `https://www.youtube.com/embed/${response.data.results[0].key}`
          )
          return decodeURIComponent(trailerUrl.toString())
        }
        return ''
      })
      .catch((error) => console.log(error))
  },

  getCast: (movieId) => {
    const creditsUrl = `/movie/${movieId}/credits`
    return axios
      .get(creditsUrl)
      .then((response) => {
        return response.data.cast
          .filter((cast) => cast.profile_path)
          .slice(0, 5)
      })
      .catch((error) => console.log(error))
  },

  search: (query) => {
    const creditsUrl = `search/movie?query=${query}`
    return axios
      .get(creditsUrl)
      .then((response) => {
        return response.data.results
      })
      .catch((error) => console.log(error))
  }
}

module.exports = Movie
