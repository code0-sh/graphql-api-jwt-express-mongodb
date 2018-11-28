// @flow
import { pubsub } from '../app'
import controller from './controller'
import type { $Request, $Response } from 'express'

const COLOR_UPDATED = 'COLOR_UPDATED'

const resolver = {
  Subscription: {
    colorUpdated: {
      subscribe: () => pubsub.asyncIterator([COLOR_UPDATED])
    }
  },
  Query: {
    colors (_: Object, args: $Request, context: Object) {
      return controller.colors()
    }
  },
  Mutation: {
    addColor (_: Object, args: $Request, context: Object) {
      return controller.add(args)
    },
    removeColor (_: Object, args: $Request, context: Object) {
      return controller.remove(args)
    },
    updateColor (_: Object, args: $Request, context: Object) {
      pubsub.publish(COLOR_UPDATED, { colorUpdated: args })
      return controller.updateName(args)
    }
  }
}

export default resolver
