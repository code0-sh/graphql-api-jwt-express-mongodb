// @flow
import Color from './model'
import { errorName } from '../constants'

const controller = {
  colors: async () => {
    try {
      const colors = await Color.find()
      if (!colors) throw new Error(errorName.NO_COLOR_FOUND)
      return await colors
    } catch (err) {
      throw err.message
    }
  },
  add: async (args: $Request) => {
    const newColor = new Color({
      code: args.code,
      name: args.name
    })
    await newColor.save(error => new Error(errorName.FAILED_COLOR_SAVE))
    return newColor
  },
  updateName: async (args: $Request) => {
    const doc = await Color.findOneAndUpdate(
      { code: args.code },
      { name: args.name },
      { new: true },
      (error, doc) => {
        return new Error(errorName.FAILED_COLOR_UPDATE)
      }
    )
    if (!doc) throw new Error(errorName.FAILED_COLOR_UPDATE)
    return doc
  },
  remove: async (args: $Request) => {
    const doc = await Color.findOneAndRemove({
      code: args.code
    })
    if (!doc) throw new Error(errorName.COLOR_IS_EMPTY)
    return doc
  }
}

export default controller
