// @flow
import { gql } from 'apollo-server'

const query = gql`
  type Query {
    banners: [Banner]
  }
`

export default query
