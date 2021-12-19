
import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'

import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authentication', () => {
  //  test('can sign up user', async (assert) => {
  //
  //  })

  test('user can log in with valid email and password', async (assert) => {
    const { $attributes: user } = await UserFactory.make()

    await User.create({ email: user.email, password: user.password })

    await supertest.agent(BASE_URL)
      .post('/login')
      .field('email', user.email)
      .field('password', user.password)

    await supertest(BASE_URL).get('/admin').expect(200)

  })

  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.email = 'virk@adonisjs.com'
    user.password = 'secret'
    await user.save()

    assert.notEqual(user.password, 'secret')
  })
})
