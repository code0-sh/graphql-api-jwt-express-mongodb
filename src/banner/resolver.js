// @flow
import controller from './controller'
import type { $Request, $Response } from 'express'

const resolver = {
  Query: {
    banners (_: Object, args: $Request, context: Object) {
      return controller.banners()
    }
  },
  Mutation: {
    addBanner (_: Object, args: $Request, context: Object) {
      return controller.add(args)
    },
    removeBanner (_: Object, args: $Request, context: Object) {
      return controller.remove(args)
    }
  }
}

export default resolver
