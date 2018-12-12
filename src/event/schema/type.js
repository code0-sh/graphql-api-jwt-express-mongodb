// @flow
import { gql } from 'apollo-server'

const type = gql`
  type Event {
    id: ID!
    date: String!
    title: String!
    description: String!
    url: String!
  }
  type Edge {
    event: Event
    cursor: String
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }
  type Events {
    totalCount: Int
    edges: [Edge]
    pageInfo: PageInfo
  }
`

export default type
