// @flow

export default class CustomError extends Error {
  statusCode: number
  constructor (opts: { message: string, statusCode: number }) {
    super(opts.message)
    this.statusCode = opts.statusCode
  }
}
