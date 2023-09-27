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
  query search($query: String, $page: Int) {
    search(query: $query, page: $page) {
      page
      total_pages
      results {
        title
        id
        poster_path
      }
    }
  }
`

const movieQuery = gql`
  query movie($id: ID!) {
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
  query genre($id: ID!, $page: Int) {
    genre(id: $id, page: $page) {
      name
      page
      total_pages
      movies {
        id
        title
        release_date
        poster_path
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
