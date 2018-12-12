// @flow
import controller from './controller'

type Token = {
  token: string
}

const resolver = {
  Query: {
    user (parent: any, args: any, context: any, info: any) {
      return controller.get(context)
    }
  },
  Mutation: {
    createUser (
      parent: any,
      args: { name: string, email: string, password: string },
      context: any,
      info: any
    ) {
      return controller.create(args)
    },
    updateUser (
      parent: any,
      args: { name?: string, email?: string, password?: string },
      context: any,
      info: any
    ) {
      return controller.update(args, context)
    },
    deleteUser (parent: any, args: any, context: any, info: any) {
      return controller.delete(context)
    }
  }
}

export default resolver
