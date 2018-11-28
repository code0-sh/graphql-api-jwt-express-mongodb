// @flow
import { addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server'
import { GraphQLSchema } from 'graphql'
import type from './schema/type'
import query from './schema/query'
import mutation from './schema/mutation'
import subscription from './schema/subscription'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [type, query, mutation, subscription]
})

addMockFunctionsToSchema({ schema: schema })

export default schema
