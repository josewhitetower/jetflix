const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 4000
const app = express()
// app.use(cors())
app.use('/graphql', cors(), graphqlHTTP({ schema, graphiql: true }))
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
