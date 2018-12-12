// @flow
import { gql } from 'apollo-server'

const mutation = gql`
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    updateUser(name: String, email: String, password: String): User!
    deleteUser: User!
  }
`

export default mutation
