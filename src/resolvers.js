// @flow
import authResolver from './auth/resolver'
import sponsorResolver from './sponsor/resolver'
import statusResolver from './status/resolver'
import eventResolver from './event/resolver'
import userResolver from './user/resolver'

const resolvers = [authResolver, sponsorResolver, statusResolver, eventResolver, userResolver]

export default resolvers
