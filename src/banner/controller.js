// @flow
import Banner from './model'
import { errorName } from '../constants'

const controller = {
  banners: async () => {
    try {
      const banners = await Banner.find()
      if (!banners) throw new Error(errorName.NO_USER_FOUND)
      return await banners
    } catch (err) {
      throw err.message
    }
  },
  add: async (args: $Request) => {
    const newBanner = new Banner({
      name: args.name,
      src: args.src,
      url: args.url
    })
    const error = await newBanner.save()
    if (error) return error
    return newBanner
  },
  remove: async (args: $Request) => {
    const doc = await Banner.findOneAndRemove({
      name: args.name
    })
    return doc
  }
}

export default controller
