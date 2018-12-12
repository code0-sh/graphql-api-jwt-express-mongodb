// @flow
import controller from './controller'

const resolver = {
  Query: {
    sponsors (parent: any, args: any, context: any, info: any) {
      return controller.get()
    }
  },
  Mutation: {
    createSponsor (
      parent: any,
      args: { name: string, src: string, url: string },
      context: any,
      info: any
    ) {
      return controller.create(args, context)
    },
    deleteSponsor (parent: any, args: { id: string }, context: any, info: any) {
      console.log('foo')
      return controller.delete(args, context)
    }
  }
}

export default resolver
