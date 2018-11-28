// @flow
import { gql } from 'apollo-server'

const subscription = gql`
  type Subscription {
    colorUpdated: Color
  }
`

export default subscription
