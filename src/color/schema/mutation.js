// @flow
import { gql } from 'apollo-server'

const mutation = gql`
  type Mutation {
    addColor(code: String!, name: String!): Color!
    removeColor(code: String!): Color!
    updateColor(code: String!, name: String!): Color!
  }
`

export default mutation
