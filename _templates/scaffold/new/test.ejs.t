---
to: test/<%= name %>.spec.ts
---
import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import <%= h.capitalize(name) %> from 'App/Models/<%= h.capitalize(name) %>'
import { <%= h.capitalize(name) %>Factory } from 'Database/factories'
import { loginUser } from './helpers'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('<%= h.inflection.pluralize(name) %>', () => {
  test('can navigate to the create <%= name %> form', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    await agent.get('/<%= h.inflection.pluralize(name) %>/create').expect(200)
  })

  test('can create a <%= name %>', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: <%= name %> } = await <%= h.capitalize(name) %>Factory
      .merge({ phoneNumber: '0233989848', otherPhoneNumber: '0299838479' })
      .make()

    const response = await agent
      .post('/<%= name %>')
      <% fields.split(',').forEach((fieldCombo) => { -%>
      .field('<%= fieldCombo.split(':')[0] %>', <%= name %>.<%= fieldCombo.split(':')[0] %>)
      <% }) -%>

    assert.exists(response.headers.location, '<%= name %>/1')  })

  test('can see <%= name %>\'s details', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const <%= name %> = await <%= h.capitalize(name) %>Factory.create()
    const { text } = await agent.get(`/<%= name %>/${<%= name %>.id}`)

      <% fields.split(',').forEach((fieldCombo) => { -%>
      assert.include(text, <%= name %>.<%= fieldCombo.split(':')[0] %>)
      <% }) -%>
  })

  test('can update a <%= name %>', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: <%= name %> } = await <%= h.capitalize(name) %>Factory.create()

    const update<%= name %> = await <%= h.capitalize(name) %>.Factory.make()

    await agent
      .put(`/<%= name %>/${<%= name %>.id}`)
    <% fields.split(',').forEach((fieldCombo) => { -%>
      .field('<%= fieldCombo.split(':')[0] %>', <%= name %>.<%= fieldCombo.split(':')[0] %>)
    <% }) -%>
      
    const { text } = await agent.get(`/<%= name %>/${<%= name %>.id}`).expect(200)

    <% fields.split(',').forEach((fieldCombo) => { -%>
      assert.include(text, update<%= h.capitalize(name) %>.<%= fieldCombo.split(':')[0] %>)
    <% }) -%>
  })

  test('can delete a <%= name %>', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: <%= name %> } = await <%= h.capitalize(name) %>Factory.create()

    await agent.get(`/<%= name %>/${<%= name %>.id}`).expect(200)
    await agent.delete(`/<%= name %>/${<%= name %>.id}`)
    await agent.get(`/<%= name %>/${<%= name %>.id}`).expect(404)
  })
})
