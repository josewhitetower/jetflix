import axios from '../axios/axios'
import { Genre } from '../types'

const GenreModel = {
  findAll: async () => {
    const movieUrl = `/genre/movie/list`
    try {
      const response = await axios.get(movieUrl)
      return response.data.genres
    } catch (error) {
      return { error: error }
    }
  },
  findById: async (genreId: number, page?: number) => {
    const movieUrl = `/genre/movie/list`
    try {
      const response = await axios.get(movieUrl)
      const genre = response.data.genres.filter(
        (genre: Genre) => +genre.id == genreId
      )[0]
      if (genre) {
        genre.page = page
      }
      return genre
    } catch (error) {
      return { error: error }
    }
  },
}

export default GenreModel
