import { Movie } from '../types'

const axios = require('../axios/axios')
const MovieModel = {
  trending: (): Movie[] => {
    const trendingUrl = `/trending/movie/day`
    return axios
      .get(trendingUrl)
      .then((response: { data: { results: Movie[] } }) => response.data.results)
      .catch((error: Error) => ({ error: error }))
  },

  findById: (movieId: string) => {
    const movieUrl = `/movie/${movieId}`
    return axios
      .get(movieUrl)
      .then((response: { data: Movie }) => response.data)
      .catch((error: Error) => ({ error: error }))
  },

  findByGenreIdResponse: (genreId: string, page = 1) => {
    const discoverUrl = `/discover/movie/?with_genres=${genreId}&page=${page}`
    return axios
      .get(discoverUrl)
      .then((response) => response.data)
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

  getCast: (movieId: string) => {
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

  search: (query: string, page = 1) => {
    const creditsUrl = `search/movie?query=${query}&page=${page}`
    return axios
      .get(creditsUrl)
      .then((response: { data: Movie[] }) => {
        return response.data
      })
      .catch((error: Error) => console.log(error))
  },
}

export default MovieModel
