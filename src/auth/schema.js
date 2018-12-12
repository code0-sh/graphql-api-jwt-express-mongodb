// @flow
import { addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server'
import { GraphQLSchema } from 'graphql'
import type from './schema/type'
import mutation from './schema/mutation'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [type, mutation]
})

addMockFunctionsToSchema({ schema: schema })

export default schema
