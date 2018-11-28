// @flow
import { gql } from 'apollo-server'

const subscription = gql`
  type Subscription {
    statusUpdated: Status
  }
`

export default subscription
