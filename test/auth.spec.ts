
import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'

import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authentication', () => {
  test('user can sign up with email and password', async (assert) => {
    const { $attributes: user } = await UserFactory.make()

    const response = await supertest.agent(BASE_URL)
      .post('/signup')
      .field('email', user.email)
      .field('password', user.password)

    assert.equal(response.headers.location, '/admin')
  })

  test('unauthenticated user should be redirected to login', async (assert) => {
    const response = await supertest.agent(BASE_URL)
      .get('/admin').expect(302)

    assert.equal(response.headers.location, '/login')

  })

  test('user can log in with valid email and password', async (assert) => {
    const { $attributes: user } = await UserFactory.make()

    await User.create({ email: user.email, password: user.password })

    const response = await supertest.agent(BASE_URL)
      .post('/login')
      .field('email', user.email)
      .field('password', user.password)

    assert.equal(response.headers.location, '/admin')
  })

  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.email = 'virk@adonisjs.com'
    user.password = 'secret'
    await user.save()

    assert.notEqual(user.password, 'secret')
  })
})
