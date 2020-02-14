import gql from 'graphql-tag'

const getTrendingQuery = gql`
  {
    trending {
      title
      id
    }
  }
`

const search = gql`
 query search {
   search (id)
 }
`

export { getTrendingQuery }
