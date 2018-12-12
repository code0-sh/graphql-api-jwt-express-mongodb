// @flow
import { gql } from 'apollo-server'

const type = gql`
  type Sponsor {
    id: ID!
    name: String!
    src: String!
    url: String!
  }
`

export default type
