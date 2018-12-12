// @flow
import { gql } from 'apollo-server'

const query = gql`
  type Query {
    user: User
  }
`

export default query
