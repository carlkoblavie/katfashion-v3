import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Worker from 'App/Models/Worker'
import { WorkerFactory } from 'Database/factories'
import { loginUser } from './helpers'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('workers', () => {
  test('can navigate to the create worker form', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    await agent.get('/workers/create').expect(200)
  })

  test('can create a worker', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: worker } = await WorkerFactory
      .make()

    const response = await agent
      .post('/workers')
      .field('first_name', worker.first_name)
      .field('last_name', worker.last_name)
      .field('phone_number', worker.phone_number)
      .field('other_phone_number', worker.other_phone_number)
      .field('role', worker.role)

    assert.exists(response.headers.location, 'worker/1')
  })

  test('can see worker\'s details', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: worker } = await WorkerFactory.create()
    const { text } = await agent.get(`/workers/${worker.id}`)

    assert.include(text, worker.first_name)
    assert.include(text, worker.last_name)
    assert.include(text, worker.phone_number)
    assert.include(text, worker.other_phone_number)
    assert.include(text, worker.role)
  })

  test('can update a worker', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: worker } = await WorkerFactory.create()

    const updateWorker = await WorkerFactory.make()

    const response = await agent
      .put(`/workers/${worker.id}`)
      .field('first_name', updateWorker.first_name)
      .field('last_name', updateWorker.last_name)
      .field('phone_number', updateWorker.phone_number)
      .field('other_phone_number', updateWorker.other_phone_number)
      .field('role', updateWorker.role)

    const { text } = await agent.get(`/workers/${worker.id}`).expect(200)

    assert.include(text, updateWorker.first_name)
    assert.include(text, updateWorker.last_name)
    assert.include(text, updateWorker.phone_number)
    assert.include(text, updateWorker.other_phone_number)
    assert.include(text, updateWorker.role)
  })

  test('can delete a worker', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: worker } = await WorkerFactory.create()

    await agent.get(`/workers/${worker.id}`).expect(200)
    await agent.delete(`/workers/${worker.id}`)
    await agent.get(`/workers/${worker.id}`).expect(404)
  })
})
