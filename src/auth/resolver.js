// @flow
import controller from './controller'

const resolver = {
  Mutation: {
    login (parent: any, args: { email: string, password: string }, context: any, info: any) {
      return controller.create(args)
    },
    updateToken (parent: any, args: { id: string, refreshToken: string }, context: any, info: any) {
      return controller.update(args)
    },
    logout (parent: any, args: any, context: any, info: any) {
      return controller.delete(context)
    }
  }
}

export default resolver
