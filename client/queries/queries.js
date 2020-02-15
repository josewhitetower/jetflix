import gql from 'graphql-tag'

const getTrendingQuery = gql`
  {
    trending {
      title
      id
    }
  }
`

const searchQuery = gql`
  query search($query: String) {
    search(query: $query) {
      title
    }
  }
`

export { getTrendingQuery, searchQuery }
