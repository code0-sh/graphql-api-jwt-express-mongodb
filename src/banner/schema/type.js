// @flow
import { gql } from 'apollo-server'

const type = gql`
  type Banner {
    name: String!
    src: String!
    url: String!
  }
`

export default type
