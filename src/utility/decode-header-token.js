// @flow
import jwt from 'jsonwebtoken'
import { config } from '../config'
import type { $Request } from 'express'

export type Decoded =
  | {
      _id: string,
      iat: number,
      exp: number
    }
  | Object

const decodeHeaderToken = (context: any) => {
  if (context.token && context.token.split(' ')[0] === 'Bearer') {
    const token = context.token.split(' ')[1]
    return jwt.verify(token, config.jwtSecret)
  }

  return null
}

export default decodeHeaderToken
