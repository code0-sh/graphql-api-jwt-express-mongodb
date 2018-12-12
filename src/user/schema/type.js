// @flow
import { gql } from 'apollo-server'

const type = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
`

export default type
