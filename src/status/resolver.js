// @flow
import { pubsub } from '../app'
import controller from './controller'
import type { $Request, $Response } from 'express'

const STATUS_UPDATED = 'COLOR_UPDATED'

const resolver = {
  Subscription: {
    statusUpdated: {
      subscribe: () => pubsub.asyncIterator([STATUS_UPDATED])
    }
  },
  Query: {
    statuses (_: Object, args: $Request, context: Object) {
      return controller.statuses()
    }
  },
  Mutation: {
    addStatus (_: Object, args: $Request, context: Object) {
      return controller.add(args)
    },
    removeStatus (_: Object, args: $Request, context: Object) {
      return controller.remove(args)
    },
    updateStatus (_: Object, args: $Request, context: Object) {
      pubsub.publish(STATUS_UPDATED, { statusUpdated: args })
      return controller.update(args)
    }
  }
}

export default resolver
