// @flow
import Event from './model'
import { errorType } from '../constants'
import { CustomError } from '../utility'

type Request = {
  date: string,
  title: string,
  description: string,
  url: string
}

export const verifyEvent = (args: Request) => {
  const result = Event.joiValidate(args)
  if (result.error) {
    let errorMessages = ''
    for (const item of result.error.details) {
      errorMessages += item.message + '\n'
    }
    throw new CustomError({ message: errorMessages, statusCode: 400 })
  }
}
