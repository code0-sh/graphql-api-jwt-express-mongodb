// @flow
import Status from './model'
import { errorName } from '../constants'

const controller = {
  statuses: async () => {
    try {
      const statuses = await Status.find()
      if (!statuses) throw new Error(errorName.NO_STATUS_FOUND)
      let preformattedStatuses = {}
      statuses.forEach(status => {
        preformattedStatuses[status.type] = {
          _id: status._id,
          code: status.code,
          name: status.name,
          created_at: status.created_at,
          updated_at: status.updated_at
        }
      })

      return preformattedStatuses
    } catch (err) {
      throw err.message
    }
  },
  add: async (args: $Request) => {
    const newStatus = new Status({
      type: args.type,
      code: args.code,
      name: args.name
    })
    const error = await newStatus.save(
      error => new Error(errorName.FAILED_STATUS_SAVE)
    )
    if (error) return error
    return newStatus
  },
  update: async (args: $Request) => {
    const doc = await Status.findOneAndUpdate(
      { type: args.type },
      { name: args.name, code: args.code },
      { new: true },
      (error, doc) => {
        return new Error(errorName.FAILED_STATUS_UPDATE)
      }
    )
    if (!doc) throw new Error(errorName.FAILED_STATUS_UPDATE)
    return doc
  },
  remove: async (args: $Request) => {
    const doc = await Status.findOneAndRemove({
      type: args.type
    })
    await Status.deleteMany({ type: args.type })
    if (!doc) throw new Error(errorName.STATUS_IS_EMPTY)
    return doc
  }
}

export default controller
