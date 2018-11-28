// @flow
import httpServer from './app'

const port = process.env.PORT || 8000

httpServer.listen({ port }, () => {
  console.log('Express server listening on port ' + port)
})
