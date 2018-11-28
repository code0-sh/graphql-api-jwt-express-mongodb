// @flow
import { gql } from 'apollo-server'

const mutation = gql`
  type Mutation {
    addBanner(name: String!, src: String!, url: String!): Banner!
    removeBanner(name: String!): Banner!
  }
`

export default mutation
