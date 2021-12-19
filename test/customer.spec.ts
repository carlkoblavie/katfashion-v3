import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Customer from 'App/Models/Customer'
import { CustomerFactory } from 'Database/factories'
import { loginUser } from './helpers'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Customers', () => {
  test('can navigate to the create customer form', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    await agent.get('/customers/create').expect(200)
  })

  test('can create a customer', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: customer } = await CustomerFactory
      .merge({ phoneNumber: '0233989848', otherPhoneNumber: '0299838479' })
      .make()

    await agent
      .post('/customer')
      .field('first_name', customer.firstName)
      .field('last_name', customer.lastName)
      .field('location', customer.location)
      .field('gender', customer.gender)
      .field('phone_number', customer.phoneNumber)
      .field('other_phone_number', customer.otherPhoneNumber)

    const newCustomer = await Customer.findBy('phoneNumber', customer.phoneNumber)

    assert.exists(newCustomer)
  })

  test('can see customer\'s details', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const customer = await CustomerFactory.merge({ phoneNumber: '0233989848', otherPhoneNumber: '0299838479' }).create()
    const { text } = await agent.get(`/customer/${customer.id}`)

    assert.include(text, customer.firstName)
    assert.include(text, customer.lastName)
    assert.include(text, customer.location)
    assert.include(text, customer.gender)
    assert.include(text, customer.phoneNumber)
    assert.include(text, customer.otherPhoneNumber)
  })

  test('can update a customer', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: customer } = await CustomerFactory.merge({ phone_number: '0233989848', other_phone_number: '0299838479' }).create()

    const updateCustomer = {
      firstName: 'Carl',
      lastName: 'Koblavie',
      location: 'Tema'
    }

    await agent
      .put(`/customer/${customer.id}`)
      .field('first_name', updateCustomer.firstName)
      .field('last_name', updateCustomer.lastName)
      .field('location', updateCustomer.location)
      .field('gender', customer.gender)
      .field('phone_number', '0299222111')
      .field('other_phone_number', '0244998101')

    const { text } = await agent.get(`/customer/${customer.id}`).expect(200)

    assert.include(text, updateCustomer.firstName)
    assert.include(text, updateCustomer.lastName)
    assert.include(text, updateCustomer.location)
  })

  test('can delete a customer', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: customer } = await CustomerFactory
      .merge({ phoneNumber: '0233922000', otherPhoneNumber: '0299444411' })
      .create()

    await agent.get(`/customer/${customer.id}`).expect(200)
    await agent.delete(`/customer/${customer.id}`)
    await agent.get(`/customer/${customer.id}`).expect(404)
  })
})
