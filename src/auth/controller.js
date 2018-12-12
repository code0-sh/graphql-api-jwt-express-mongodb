// @flow
import express from 'express'
import jwt from 'jsonwebtoken'
import randToken from 'rand-token'
import bcrypt from 'bcrypt'
import User from '../user/model'
import Auth from './model'
import { config } from '../config'
import { verifyUser } from '../user/verify-user'
import { errorType } from '../constants'
import { CustomError, decodeHeaderToken } from '../utility'
import type { Decoded } from '../utility'

const controller = {
  create: async (args: { email: string, password: string }) => {
    const { email, password } = args
    const user = await User.findOne({ email })
    if (!user) throw new CustomError(errorType.FAILED_FIND_USER)

    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if (!passwordIsValid) throw new CustomError(errorType.UNAUTHORIZED)

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: config.accessTokenExpirationSeconds
    })
    const refreshToken = randToken.uid(256)

    const newAuth = await Auth.update(
      { id: user._id },
      { $set: { refreshToken } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    if (!newAuth) throw new CustomError(errorType.FAILED_UPDATE_REFRESH_TOKEN)
    return {
      token: token,
      refreshToken,
      message: 'Authentication successfully finished.'
    }
  },
  delete: async (context: any) => {
    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    const auth = await Auth.findOneAndRemove({
      id: decoded._id
    })
    if (!auth) throw new CustomError(errorType.FAILED_DELETE_USER)
    return true
  },
  update: async (args: { id: string, refreshToken: string }) => {
    const { id, refreshToken } = args
    const auth = await Auth.findOne({ id })
    if (!auth) throw new CustomError(errorType.EXPIRED_REFRESH_TOKEN)
    if (!auth.isValid || auth.refreshToken !== refreshToken) {
      throw new CustomError(errorType.INVALID_REFRESH_TOKEN)
    }

    const user = await User.findOne({ _id: auth.id })
    if (!user) throw new CustomError(errorType.NO_USER_FOUND)

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: config.accessTokenExpirationSeconds
    })
    const newRefreshToken = randToken.uid(256)

    const newAuth = await Auth.update(
      { id: user._id },
      { $set: { refreshToken: newRefreshToken } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    if (!newAuth) throw new CustomError(errorType.FAILED_UPDATE_REFRESH_TOKEN)
    return {
      token: token,
      refreshToken: newRefreshToken,
      message: 'Successful updated of tokens.'
    }
  }
}

export default controller
