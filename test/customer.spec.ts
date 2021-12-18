import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Customer from 'App/Models/Customer'
import { CustomerFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Customers', () => {
  test('can navigate to the create customer form', async (assert) => {
    await supertest(BASE_URL).get('/customers/create').expect(200)
  })

  test('can create a customer', async (assert) => {
    const  { $attributes: customer } = await CustomerFactory
	  	.merge({ phoneNumber: '0233989848', otherPhoneNumber: '0299838479'})
	  	.make()

    await supertest.agent(BASE_URL)
      .post('/customer')
        .field('first_name', customer.firstName)
        .field('last_name',customer.lastName)
        .field('location', customer.location)
        .field('gender',  customer.gender)
        .field('phone_number', customer.phoneNumber)
        .field('other_phone_number', customer.otherPhoneNumber) 

    const newCustomer = await Customer.findBy('phoneNumber', customer.phoneNumber)

    assert.exists(newCustomer)
   })
  
  test('can see customer\'s details', async (assert) => {
	  const customer = await CustomerFactory.merge({ phoneNumber: '0233989848', otherPhoneNumber: '0299838479'}).create()
	  const { text } = await supertest(BASE_URL).get(`/customer/${customer.id}`)
	  
	  assert.include(text, customer.firstName)
	  assert.include(text, customer.lastName)
	  assert.include(text, customer.location)
	  assert.include(text, customer.gender)
	  assert.include(text, customer.phoneNumber)
	  assert.include(text, customer.otherPhoneNumber)
  })

  test('can update a customer', async (assert) => {
  const { $attributes: customer } = await CustomerFactory.merge({ phone_number: '0233989848', other_phone_number: '0299838479'}).create()

  const updateCustomer = {
    firstName: 'Carl',
    lastName: 'Koblavie'
    location: 'Tema',
  }

  await supertest.agent(BASE_URL)
    .put(`/customer/${customer.id}`)
    .field('first_name', updateCustomer.firstName)
    .field('last_name', updateCustomer.lastName)
    .field('location', updateCustomer.location)
    .field('gender', customer.gender)
    .field('phone_number', '0299222111')
    .field('other_phone_number', '0244998101') 


    const { text } = await supertest(BASE_URL).get(`/customer/${customer.id}`).expect(200)

    assert.include(text, updateCustomer.firstName)
    assert.include(text, updateCustomer.lastName)
    assert.include(text,  updateCustomer.location)
  })

  test('can delete a customer', async (assert) => {
     const {$attributes: customer} = await CustomerFactory
	  	.merge({ phoneNumber: '0233922000', otherPhoneNumber: '0299444411'})
	  	.create()

      await supertest.agent(BASE_URL)
       .delete(`/customer/${customer.id}`)

     const deletedCustomer = await Customer.find(`${customer.id}`)

     assert.notExists(deletedCustomer)
  })
})
