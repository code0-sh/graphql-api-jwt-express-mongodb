// @flow
import { gql } from 'apollo-server'

const query = gql`
  type Query {
    event(id: ID!): Event
    events(first: Int!, after: String): Events
  }
`

export default query
