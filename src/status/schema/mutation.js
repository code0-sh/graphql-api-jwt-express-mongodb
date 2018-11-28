// @flow
import { gql } from 'apollo-server'

const mutation = gql`
  type Mutation {
    addStatus(type: String!, code: String!, name: String!): Status!
    removeStatus(type: String!): Status!
    updateStatus(type: String!, code: String!, name: String!): Status!
  }
`

export default mutation
