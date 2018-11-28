// @flow
import httpServer from '../../app'
import supertest from 'supertest'
const agent = supertest.agent(httpServer)

const testUser = {
  name: 'tanaka',
  email: 'tanaka@sample.co.jp',
  password: 'FRnuaLJEkvwoVhHe'
}

describe('user', () => {
  it('should return JSON array', async () => {
    const token = await agent
      .post('/api/auth/login')
      .send({
        name: testUser.name,
        email: testUser.email,
        password: testUser.password
      })
      .then(res => res.body.token)
    const body = await agent
      .get('/api/users/me')
      .set({ Authorization: 'bearer ' + token })
      .then(res => res.body)
    expect(body.name).toEqual('tanaka')
  })
})
