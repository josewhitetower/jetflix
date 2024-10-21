import { Person, Search } from '../types'

import axios from '../axios/axios'
const MovieModel = {
  trending: async () => {
    const trendingUrl = `/trending/movie/day`
    try {
      const response = await axios.get(trendingUrl)
      return response.data.results
    } catch (error) {
      return { error: error }
    }
  },

  findById: async (movieId: number) => {
    const movieUrl = `/movie/${movieId}`
    try {
      const response = await axios.get(movieUrl)

      return response.data
    } catch (error) {
      return { error: error }
    }
  },

  findByGenreIdResponse: async (genreId: number, page = 1) => {
    const discoverUrl = `/discover/movie?with_genres=${genreId}&page=${page}`
    try {
      const response = await axios.get(discoverUrl)
      return response.data
    } catch (error) {
      return { error: error }
    }
  },

  getTrailerVideo: async (movieId: string) => {
    const trailerVideoUrl = `/movie/${movieId}/videos`
    return axios
      .get(trailerVideoUrl)
      .then((response: { data: { results: { key: string }[] } }) => {
        if (response.data.results[0] && response.data.results[0].key) {
          const trailerUrl = new URL(
            `https://www.youtube.com/embed/${response.data.results[0].key}`
          )
          return decodeURIComponent(trailerUrl.toString())
        }
        return ''
      })
      .catch((error: Error) => console.log(error))
  },

  getCast: async (movieId: string) => {
    const creditsUrl = `/movie/${movieId}/credits`
    return axios
      .get(creditsUrl)
      .then((response: { data: { cast: Person[] } }) => {
        return response.data.cast
          .filter((cast) => cast.profile_path)
          .slice(0, 5)
      })
      .catch((error: Error) => console.log(error))
  },

  search: async (query?: string, page: number | undefined | null = 1) => {
    const creditsUrl = `search/movie?query=${query}&page=${page}`
    return axios
      .get(creditsUrl)
      .then((response: { data: Search }) => response.data)
      .catch((error: Error) => console.log(error))
  },
}

export default MovieModel
