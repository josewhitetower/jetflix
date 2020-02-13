const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')
require('dotenv').config()

const app = express()
// app.use(cors())
app.use('/graphql', cors(), graphqlHTTP({ schema, graphiql: true }))
app.listen(4000, () => {
  console.log('listening on port 4000')
})
