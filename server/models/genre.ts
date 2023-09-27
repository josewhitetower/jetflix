import axios from '../axios/axios'
import { Genre } from '../types'

const GenreModel = {
  findAll: () => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response: { data: { genres: Genre[] } }) => response.data.genres)
      .catch((error: Error) => ({ error: error }))
  },
  findById: (genreId: number, page: number) => {
    const movieUrl = `/genre/movie/list`
    return axios
      .get(movieUrl)
      .then((response: { data: { genres: Genre[] } }) => {
        const genre = response.data.genres.filter((genre) => +genre.id == genreId)[0]
        if (genre) {
          genre.page = page
        }
        return genre
      })
      .catch((error: Error) => ({ error: error }))
  },
}

export default GenreModel
