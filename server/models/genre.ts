import { Genre } from '../types'

const axios = require('../axios/axios')
const GenreModel = {
  findAll: () => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response: { data: { genres: Genre[] } }) => response.data.genres)
      .catch((error: Error) => ({ error: error }))
  },
  findById: (genreId: unknown, page: number) => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response: { data: { genres: Genre[] } }) => {
        const genre = response.data.genres.find((genre) => genre.id == genreId)
        if (genre) {
          genre.page = page
        }
        return genre
      })
      .catch((error: Error) => ({ error: error }))
  },
}

export default GenreModel
