// @flow
import { gql } from 'apollo-server'

const mutation = gql`
  type Mutation {
    createSponsor(name: String!, src: String!, url: String!): Sponsor!
    deleteSponsor(id: ID!): Sponsor!
  }
`

export default mutation
