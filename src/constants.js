export const errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  NO_USER_FOUND: 'NO_USER_FOUND',
  NO_COLOR_FOUND: 'NO_COLOR_FOUND',
  NO_STATUS_FOUND: 'NO_STATUS_FOUND',
  COLOR_IS_EMPTY: 'COLOR_IS_EMPTY',
  STATUS_IS_EMPTY: 'STATUS_IS_EMPTY',
  FAILED_COLOR_SAVE: 'FAILED_COLOR_SAVE',
  FAILED_COLOR_UPDATE: 'FAILED_COLOR_UPDATE',
  FAILED_STATUS_SAVE: 'FAILED_STATUS_SAVE',
  FAILED_STATUS_UPDATE: 'FAILED_STATUS_UPDATE'
}

export const errorType = {
  UNAUTHORIZED: {
    message: 'Authentication is needed to get requested response.',
    statusCode: 401
  },
  NO_USER_FOUND: {
    message: 'No user found.',
    statusCode: 404
  },
  NO_COLOR_FOUND: {
    message: 'No color found.',
    statusCode: 404
  },
  NO_STATUS_FOUND: {
    message: 'No status found.',
    statusCode: 404
  },
  COLOR_IS_EMPTY: {
    message: 'Color is empty.',
    statusCode: 404
  },
  STATUS_IS_EMPTY: {
    message: 'Status is empty.',
    statusCode: 404
  },
  FAILED_COLOR_SAVE: {
    message: 'Failed color save.',
    statusCode: 500
  },
  FAILED_COLOR_UPDATE: {
    message: 'Failed color update.',
    statusCode: 500
  },
  FAILED_STATUS_SAVE: {
    message: 'Failed status save.',
    statusCode: 500
  },
  FAILED_STATUS_UPDATE: {
    message: 'Failed status update.',
    statusCode: 500
  }
}
