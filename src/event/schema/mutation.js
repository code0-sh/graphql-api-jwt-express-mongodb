// @flow
import { gql } from 'apollo-server'

const mutation = gql`
  type Mutation {
    createEvent(date: String!, title: String!, description: String!, url: String!): Event!
    deleteEvent(id: ID!): Event!
  }
`

export default mutation
