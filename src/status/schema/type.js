// @flow
import { gql } from 'apollo-server'

const type = gql`
  type Status {
    type: String!
    code: String!
    name: String!
  }
  type PreformattedStatus {
    code: String!
    name: String!
  }
  type PreformattedStatuses {
    right: PreformattedStatus
    left: PreformattedStatus
  }
`

export default type
