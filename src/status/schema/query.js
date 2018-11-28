// @flow
import { gql } from 'apollo-server'

const query = gql`
  type Query {
    statuses: PreformattedStatuses
  }
`

export default query
