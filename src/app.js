// @flow
import express from 'express'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import { PubSub } from 'apollo-server'
import { GraphQLSchema } from 'graphql'
import { mergeSchemas } from 'graphql-tools'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import fs from 'fs'
import RateLimit from 'express-rate-limit'
import './db'
import auth from './auth/passport'

import schemas from './schemas'
import resolvers from './resolvers'

import { errorType } from './constants'
import type { $Request, $Response } from 'express'

export const pubsub = new PubSub()

const app = express()

if (app.get('env') === 'production') {
  // helmet
  app.use(helmet())

  // log
  const accessLogStream = fs.createWriteStream('./logs/access.log', {
    flags: 'a'
  })
  app.use(morgan('combined', { stream: accessLogStream }))

  // limit requests
  const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  })
  // apply to all requests
  app.use(limiter)
}

if (app.get('env') === 'development') {
  // parse application/x-www-form-urlencoded
  // for easier testing with Postman or plain HTML forms
  app.use(bodyParser.urlencoded({ extended: true }))

  // log
  app.use(morgan('dev'))
}

// allow CORS
app.use(cors())

// initialize Passport
app.use(auth.initialize())

// parse application/json
app.use(bodyParser.text({ type: 'application/graphql' }))
app.use(bodyParser.json())

const schema: GraphQLSchema = mergeSchemas({
  schemas,
  resolvers
})
const path = '/graphql'
const server = new ApolloServer({
  schema,
  formatError: err => {
    const { message, statusCode } = err.originalError
    return { message, statusCode }
  },
  uploads: false,
  tracing: true,
  context: ({ req, res }) => ({ token: req.headers.authorization })
})

server.applyMiddleware({ app, path })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

export default httpServer
