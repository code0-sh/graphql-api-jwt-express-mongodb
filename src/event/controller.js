// @flow
import Event from './model'
import { errorType } from '../constants'
import { verifyEvent } from './verify-event'
import { CustomError, decodeHeaderToken } from '../utility'
import type { Decoded } from '../utility'

const controller = {
  event: async (args: $Request) => {
    const event = await Event.findOne({ id: args.id }, error => {
      if (error) throw new CustomError(errorType.NO_EVENT_FOUND)
    })
    return event
  },
  events: async (args: $Request) => {
    const first = args.first
    const after = args.after || ''

    let totalCount = 0
    let edgesArray = []
    // <<<Tip>>> - Decoding the cursor value from Base 64 to integer.
    let cursorNumeric = parseInt(Buffer.from(after, 'base64').toString('ascii'))
    if (!cursorNumeric) cursorNumeric = 0

    // <<<Tip>>> - Use Promise to handle Async behaviour of Mongoose
    var edgesAndPageInfoPromise = new Promise((resolve, reject) => {
      // <<<TIP>>> where and gt are used to check against Args.after(cursorNumeric)
      let edges = Event.where('id')
        .gt(cursorNumeric)
        .find({}, (err, result) => {
          if (err) {
            console.error('---Error ' + err)
          }
        })
        .limit(first)
        .cursor() // <<<TIP>>> Limit is obtained from Args.first

      edges.on('data', res => {
        edgesArray.push({
          // <<<Tip>>> - Encoding the cursor value to Base 64 as suggested in GraphQL documentation.
          cursor: Buffer.from(res.id.toString()).toString('base64'),
          event: {
            id: res.id,
            date: res.date,
            title: res.title,
            description: res.description,
            url: res.url
          }
        })
      })

      edges.on('error', err => {
        reject(err)
      })

      edges.on('end', () => {
        let endCursor: any = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : NaN

        let hasNextPageFlag: any = new Promise((resolve, reject) => {
          if (endCursor) {
            let endCursorNumeric = parseInt(Buffer.from(endCursor, 'base64').toString('ascii'))
            Event.where('id')
              .gt(endCursorNumeric)
              .count((err, count) => {
                // console.log(":::DEBUG::: Has Next Page Count? "+ count)
                count > 0 ? resolve(true) : resolve(false)
              })
          } else resolve(false)
        })

        // console.info(":::info::: Cursor Ended")

        resolve({
          edges: edgesArray,
          pageInfo: {
            endCursor: endCursor,
            hasNextPage: hasNextPageFlag
          }
        })
      })
    })
    let totalCountPromise = new Promise((resolve, reject) => {
      if (totalCount === 0) {
        totalCount = Event.count((err, count) => {
          if (err) reject(err)
          resolve(count)
        })
      } else resolve(totalCount)
    })

    let returnValue = Promise.all([edgesAndPageInfoPromise, totalCountPromise]).then(values => {
      return {
        edges: values[0].edges,
        totalCount: values[1],
        pageInfo: {
          endCursor: values[0].pageInfo.endCursor,
          hasNextPage: values[0].pageInfo.hasNextPage
        }
      }
    })
    return returnValue
  },
  create: async (
    args: { date: string, title: string, description: string, url: string },
    context: any
  ) => {
    const { date, title, description, url } = args

    verifyEvent(args)

    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    const savedDate = new Date(date)
    const newEvent = new Event({
      date: savedDate,
      title,
      description,
      url
    })

    try {
      return await newEvent.save()
    } catch (error) {
      throw new CustomError(errorType.FAILED_SAVE_EVENT)
    }
  },
  delete: async (args: { id: string }, context: any) => {
    const { id } = args
    const decoded: Decoded = decodeHeaderToken(context)
    if (!decoded) throw new CustomError(errorType.UNAUTHORIZED)

    try {
      const event = await Event.findOneAndRemove({ _id: id })
      if (!event) {
        return new CustomError(errorType.NO_EVENT_FOUND)
      }
      return event
    } catch (error) {
      throw new CustomError(errorType.FAILED_DELETE_EVENT)
    }
  }
}

export default controller
