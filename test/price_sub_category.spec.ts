import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Price_sub_category from 'App/Models/Price_sub_category'
import { Price_sub_categoryFactory } from 'Database/factories'
import { loginUser } from './helpers'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('price_sub_categories', () => {
  test('can navigate to the create price_sub_category form', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    await agent.get('/price_sub_categories/create').expect(200)
  })

  test('can create a price_sub_category', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: price_sub_category } = await Price_sub_categoryFactory
      .make()

    const response = await agent
      .post('/price_sub_categories')
            .field('name', price_sub_category.name)
      
    assert.exists(response.headers.location, 'price_sub_category/1')  })

  test('can see price_sub_category\'s details', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: price_sub_category } = await Price_sub_categoryFactory.create()
    const { text } = await agent.get(`/price_sub_categories/${price_sub_category.id}`)

            assert.include(text, price_sub_category.name)
        })

  test('can update a price_sub_category', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: price_sub_category } = await Price_sub_categoryFactory.create()

    const updateprice_sub_category = await Price_sub_categoryFactory.make()

    await agent
      .put(`/price_sub_categories/${price_sub_category.id}`)
          .field('name', price_sub_category.name)
          
    const { text } = await agent.get(`/price_sub_categories/${price_sub_category.id}`).expect(200)

          assert.include(text, updatePrice_sub_category.name)
      })

  test('can delete a price_sub_category', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: price_sub_category } = await Price_sub_categoryFactory.create()

    await agent.get(`/price_sub_categories/${price_sub_category.id}`).expect(200)
    await agent.delete(`/price_sub_categories/${price_sub_category.id}`)
    await agent.get(`/price_sub_categories/${price_sub_category.id}`).expect(404)
  })
})
