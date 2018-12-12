// @flow
import { gql } from 'apollo-server'

const type = gql`
  type Auth {
    name: String!
    refreshToken: String!
    isValid: Boolean!
  }
  type AuthResponse {
    token: String!
    refreshToken: String!
    message: String!
  }
`

export default type
