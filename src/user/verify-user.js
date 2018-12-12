// @flow
import User from './model'
import { errorType } from '../constants'
import { CustomError } from '../utility'

type Request = {
  name: string,
  email: string,
  password: string
}

export const verifyUser = (args: Request) => {
  const result = User.joiValidate(args)
  if (result.error) {
    let errorMessages = ''
    for (const item of result.error.details) {
      errorMessages += item.message + '\n'
    }
    throw new CustomError({ message: errorMessages, statusCode: 400 })
  }
}
