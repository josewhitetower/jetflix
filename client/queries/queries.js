import gql from 'graphql-tag'

const getTrendingQuery = gql`
  {
    trending {
      title
      id
      poster_path
    }
  }
`

const searchQuery = gql`
  query search($query: String) {
    search(query: $query) {
      title
      id
      poster_path
    }
  }
`

const movieQuery = gql`
  query movie($id: ID) {
    movie(id: $id) {
      title
      id
      poster_path
      overview
      poster_path
      tagline
      release_date
      runtime
      trailer
      vote_average
      cast {
        id
        name
        profile_path
        character
      }
      genres {
        id
        name
      }
    }
  }
`

const genreQuery = gql`
  query genre($id: ID) {
    genre(id: $id) {
      name
      movies {
        id
        title
        release_date
      }
    }
  }
`

const genresQuery = gql`
  {
    genres {
      id
      name
    }
  }
`

export { getTrendingQuery, searchQuery, movieQuery, genresQuery, genreQuery }
