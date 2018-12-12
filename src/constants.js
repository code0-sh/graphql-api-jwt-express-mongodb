// @flow
export const errorType = {
  DUPLICATE_USER: {
    message: 'User already exists. Please use another name.',
    statusCode: 400
  },
  UNAUTHORIZED: {
    message: 'Authentication is needed to get requested response.',
    statusCode: 401
  },
  EXPIRED_TOKEN: {
    message: 'The token has expired.',
    statusCode: 401
  },
  EXPIRED_REFRESH_TOKEN: {
    message: 'The refresh token has expired.',
    statusCode: 401
  },
  INVALID_REFRESH_TOKEN: {
    message: 'Invalid refresh token.',
    statusCode: 401
  },
  NO_SPONSOR_FOUND: {
    message: 'No sponsor found.',
    statusCode: 404
  },
  NO_USER_FOUND: {
    message: 'No user found.',
    statusCode: 404
  },
  NO_STATUS_FOUND: {
    message: 'No status found.',
    statusCode: 404
  },
  NO_EVENT_FOUND: {
    message: 'NO event found.',
    statusCode: 404
  },
  STATUS_IS_EMPTY: {
    message: 'Status is empty.',
    statusCode: 404
  },
  EVENT_IS_EMPTY: {
    message: 'Event is empty.',
    statusCode: 404
  },
  FAILED_SAVE_SPONSOR: {
    message: 'Failed to save sponsor.',
    statusCode: 500
  },
  FAILED_SAVE_EVENT: {
    message: 'Failed to save event.',
    statusCode: 500
  },
  FAILED_SAVE_STATUS: {
    message: 'Failed to save status.',
    statusCode: 500
  },
  FAILED_UPDATE_STATUS: {
    message: 'Failed to update status.',
    statusCode: 500
  },
  FAILED_FIND_SPONSOR: {
    message: 'Failed finding for sponsor.',
    statusCode: 500
  },
  FAILED_FIND_USER: {
    message: 'Failed finding for user.',
    statusCode: 500
  },
  FAILED_FIND_REFRESH_TOKEN: {
    message: 'Failed finding for the refresh token.',
    statusCode: 500
  },
  FAILED_SAVE_USER: {
    message: 'Failed to save user.',
    statusCode: 500
  },
  FAILED_DELETE_EVENT: {
    message: 'Failed to delete event.',
    statusCode: 500
  },
  FAILED_DELETE_SPONSOR: {
    message: 'Failed to delete sponsor.',
    statusCode: 500
  },
  FAILED_DELETE_USER: {
    message: 'Failed to delete user.',
    statusCode: 500
  },
  FAILED_UPDATE_USER: {
    message: 'Failed to update user.',
    statusCode: 500
  },
  FAILED_UPDATE_REFRESH_TOKEN: {
    message: 'Failed to update refresh token.',
    statusCode: 500
  }
}
