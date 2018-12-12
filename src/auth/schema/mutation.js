// @flow
import { gql } from 'apollo-server'

const mutation = gql`
  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    updateToken(email: String!, refreshToken: String!): AuthResponse!
    logout: Boolean!
  }
`

export default mutation
