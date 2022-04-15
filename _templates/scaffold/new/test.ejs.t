---
to: test/<%= name %>.spec.ts
---
import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import <%= h.changeCase.pascalCase(name) %> from 'App/Models/<%= h.changeCase.pascalCase(name) %>'
import { <%= h.changeCase.pascalCase(name) %>Factory } from 'Database/factories'
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

    const { $attributes: <%= h.changeCase.camelCase(name) %> } = await <%= h.changeCase.pascalCase(name) %>Factory
      .make()

    const response = await agent
      .post('/<%= h.inflection.pluralize(name) %>')
      <% fields.split(',').forEach((fieldCombo) => { -%>
      .field('<%= fieldCombo.split(':')[0] %>', <%= h.changeCase.camelCase(name) %>.<%= fieldCombo.split(':')[0] %>)
      <% }) -%>

    assert.exists(response.headers.location, '<%= h.inflection.pluralize(name) %>/1')  })

  test('can see <%= name %>\'s details', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: <%= h.changeCase.camelCase(name) %> } = await <%= h.changeCase.pascalCase(name) %>Factory.create()
    const { text } = await agent.get(`/<%= h.inflection.pluralize(name) %>/${<%= h.changeCase.camelCase(name) %>.id}`)

      <% fields.split(',').forEach((fieldCombo) => { -%>
      assert.include(text, <%= h.changeCase.camelCase(name) %>.<%= fieldCombo.split(':')[0] %>)
      <% }) -%>
  })

  test('can update a <%= name %>', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: <%= h.changeCase.camelCase(name) %> } = await <%= h.changeCase.pascalCase(name)) %>Factory.create()

    const update<%= h.changeCase.pascalCase(name) %> = await <%= h.changeCase.pascalCase(name)) %>Factory.make()

    await agent
      .put(`/<%= h.inflection.pluralize(name) %>/${<%= h.changeCase.camelCase(name) %>.id}`)
    <% fields.split(',').forEach((fieldCombo) => { -%>
      .field('<%= fieldCombo.split(':')[0] %>', <%= h.changeCase.camelCase(name) %>.<%= fieldCombo.split(':')[0] %>)
    <% }) -%>
      
    const { text } = await agent.get(`/<%= h.inflection.pluralize(name) %>/${<%= h.changeCase.camelCase(name) %>.id}`).expect(200)

    <% fields.split(',').forEach((fieldCombo) => { -%>
      assert.include(text, update<%= h.changeCase.pascalCase(name)) %>.<%= fieldCombo.split(':')[0] %>)
    <% }) -%>
  })

  test('can delete a <%= name %>', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: <%= h.changeCase.camelCase(name) %> } = await <%= h.changeCase.pascalCase(name)) %>Factory.create()

    await agent.get(`/<%= h.inflection.pluralize(name) %>/${<%= h.changeCase.camelCase(name) %>.id}`).expect(200)
    await agent.delete(`/<%= h.inflection.pluralize(name) %>/${<%= h.changeCase.camelCase(name) %>.id}`)
    await agent.get(`/<%= h.inflection.pluralize(name) %>/${<%= h.changeCase.camelCase(name) %>.id}`).expect(404)
  })
})
