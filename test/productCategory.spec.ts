import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import ProductCategory from 'App/Models/ProductCategory'
import { ProductCategoryFactory } from 'Database/factories'
import { loginUser } from './helpers'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('productCategories', () => {
  test('can navigate to the create productCategory form', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    await agent.get('/productCategories/create').expect(200)
  })

  test('can create a productCategory', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: productCategory } = await ProductCategoryFactory
      .make()

    const response = await agent
      .post('/productCategories')
            .field('name', productCategory.name)
      
    assert.exists(response.headers.location, 'productCategory/1')  })

  test('can see productCategory\'s details', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: productCategory } = await ProductCategoryFactory.create()
    const { text } = await agent.get(`/productCategories/${productCategory.id}`)

            assert.include(text, productCategory.name)
        })

  test('can update a productCategory', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: productCategory } = await ProductCategoryFactory.create()

    const updateproductCategory = await ProductCategoryFactory.make()

    await agent
      .put(`/productCategories/${productCategory.id}`)
          .field('name', productCategory.name)
          
    const { text } = await agent.get(`/productCategories/${productCategory.id}`).expect(200)

          assert.include(text, updateProductCategory.name)
      })

  test('can delete a productCategory', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: productCategory } = await ProductCategoryFactory.create()

    await agent.get(`/productCategories/${productCategory.id}`).expect(200)
    await agent.delete(`/productCategories/${productCategory.id}`)
    await agent.get(`/productCategories/${productCategory.id}`).expect(404)
  })
})
