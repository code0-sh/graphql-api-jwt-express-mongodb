// @flow
import Sponsor from './model'
import { errorType } from '../constants'
import { CustomError } from '../utility'

type Request = {
  name: string,
  src: string,
  url: string
}

export const verifySponsor = (args: Request) => {
  const result = Sponsor.joiValidate(args)
  if (result.error) {
    let errorMessages = ''
    for (const item of result.error.details) {
      errorMessages += item.message + '\n'
    }
    throw new CustomError({ message: errorMessages, statusCode: 400 })
  }
}
