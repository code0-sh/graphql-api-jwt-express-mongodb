// @flow
import { gql } from 'apollo-server'

const query = gql`
  type Query {
    sponsors: [Sponsor]
  }
`

export default query
