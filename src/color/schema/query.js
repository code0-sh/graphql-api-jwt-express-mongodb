// @flow
import { gql } from 'apollo-server'

const query = gql`
  type Query {
    colors: [Color]
  }
`

export default query
