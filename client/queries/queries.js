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

export { getTrendingQuery, searchQuery, movieQuery }
