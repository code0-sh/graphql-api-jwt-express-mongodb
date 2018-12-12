// @flow
import express from 'express'
import bcrypt from 'bcrypt'
import User from './model'
import auth from '../auth/passport'
import { verifyUser } from './verify-user'
import { CustomError, decodeHeaderToken } from '../utility'
import type { Decoded } from '../utility'
import { errorType } from '../constants'

const controller = {
  create: async (args: { name: string, email: string, password: string }) => {
    verifyUser(args)

    const { name, email, password } = args
    const hashedPassword = bcrypt.hashSync(password, 8)

    const users = await User.find({ name })
    if (users && users.length !== 0) throw new CustomError(errorType.DUPLICATE_USER)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    try {
      return await newUser.save()
    } catch (error) {
      throw new CustomError(errorType.FAILED_SAVE_USER)
    }
  },
  delete: async (context: any) => {
    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    const user = await User.findOneAndRemove({
      _id: decoded._id
    })
    if (!user) throw new CustomError(errorType.FAILED_DELETE_USER)
    return user
  },
  update: async (args: { name?: string, email?: string, password?: string }, context: any) => {
    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    const user = await User.findOneAndUpdate({ _id: decoded._id }, args, {
      new: true
    })
    if (!user) throw new CustomError(errorType.FAILED_UPDATE_USER)
    return user
  },
  get: async (context: any) => {
    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    const user = await User.findOne({ _id: decoded._id })
    if (!user) throw new CustomError(errorType.FAILED_FIND_USER)
    return user
  }
}

export default controller
