// @flow
import Status from './model'
import { errorType } from '../constants'
import { CustomError } from '../utility'

const controller = {
  statuses: async () => {
    const statuses = await Status.find()
    if (!statuses) throw new CustomError(errorType.NO_STATUS_FOUND)
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
  },
  add: async (args: $Request) => {
    const newStatus = new Status({
      type: args.type,
      code: args.code,
      name: args.name
    })
    const error = await newStatus.save(error => errorType.FAILED_SAVE_STATUS)
    if (error) return error
    return newStatus
  },
  update: async (args: $Request) => {
    const doc = await Status.findOneAndUpdate(
      { type: args.type },
      { name: args.name, code: args.code },
      { new: true }
    )
    if (!doc) throw new CustomError(errorType.FAILED_UPDATE_STATUS)
    return doc
  },
  remove: async (args: $Request) => {
    const doc = await Status.findOneAndRemove({
      type: args.type
    })
    await Status.deleteMany({ type: args.type })
    if (!doc) throw new CustomError(errorType.STATUS_IS_EMPTY)
    return doc
  }
}

export default controller
