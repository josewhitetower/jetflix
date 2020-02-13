import gql from 'graphql-tag'

const getTrendingQuery = gql`
  {
    trending {
      title
      id
    }
  }
`

export { getTrendingQuery }
