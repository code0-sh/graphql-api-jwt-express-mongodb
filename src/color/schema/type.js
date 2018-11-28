// @flow
import { gql } from 'apollo-server'

const type = gql`
  type Color {
    code: String!
    name: String!
  }
`

export default type
