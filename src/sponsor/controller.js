// @flow
import Sponsor from './model'
import { errorType } from '../constants'
import { verifySponsor } from './verify-sponsor'
import { CustomError, decodeHeaderToken } from '../utility'
import type { Decoded } from '../utility'

const controller = {
  get: async () => {
    try {
      return await Sponsor.find()
    } catch (error) {
      throw new CustomError(errorType.FAILED_FIND_SPONSOR)
    }
  },
  create: async (args: { name: string, src: string, url: string }, context: any) => {
    const { name, src, url } = args

    verifySponsor(args)

    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    try {
      const newSponsor = new Sponsor({ name, src, url })
      return await newSponsor.save()
    } catch (error) {
      throw new CustomError(errorType.FAILED_SAVE_SPONSOR)
    }
  },
  delete: async (args: { id: string }, context: any) => {
    const { id } = args
    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    try {
      const sponsor = await Sponsor.findOneAndRemove({ _id: id })
      if (!sponsor) {
        return new CustomError(errorType.NO_SPONSOR_FOUND)
      }
    } catch (error) {
      throw new CustomError(errorType.FAILED_DELETE_SPONSOR)
    }
  }
}

export default controller
