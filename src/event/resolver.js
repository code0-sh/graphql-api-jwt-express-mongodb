// @flow
import controller from './controller'

const resolver = {
  Query: {
    event (parent: any, args: any, context: any, info: any) {
      return controller.event(args)
    },
    events (parent: any, args: any, context: any, info: any) {
      return controller.events(args)
    }
  },
  Mutation: {
    createEvent (parent: any, args: any, context: any, info: any) {
      return controller.create(args, context)
    },
    deleteEvent (parent: any, args: { id: string }, context: any, info: any) {
      return controller.delete(args, context)
    }
  }
}

export default resolver
