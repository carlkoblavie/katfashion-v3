import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Team from 'App/Models/Team'
import { TeamFactory } from 'Database/factories'
import { loginUser } from './helpers'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('teams', () => {
  test('can navigate to the create team form', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    await agent.get('/teams/create').expect(200)
  })

  test('can create a team', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: team } = await TeamFactory
      .merge({ phoneNumber: '0233989848', otherPhoneNumber: '0299838479' })
      .make()

    await agent
      .post('/team')
            .field('name', team.name)
            .field('age', team.age)
            .field('location', team.location)
      
    assert.exists(response.headers.location, 'team/1')  })

  test('can see team\'s details', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const team = await TeamFactory.create()
    const { text } = await agent.get(`/team/${team.id}`)

            assert.include(text, team.name)
            assert.include(text, team.age)
            assert.include(text, team.location)
        })

  test('can update a team', async (assert) => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: team } = await TeamFactory.create()

    const updateteam = await Team.Factory.make()

    await agent
      .put(`/team/${team.id}`)
          .field('name', team.name)
          .field('age', team.age)
          .field('location', team.location)
          
    const { text } = await agent.get(`/team/${team.id}`).expect(200)

          assert.include(text, updateTeam.name)
          assert.include(text, updateTeam.age)
          assert.include(text, updateTeam.location)
      })

  test('can delete a team', async () => {
    const agent = supertest.agent(BASE_URL)
    await loginUser(agent)

    const { $attributes: team } = await TeamFactory.create()

    await agent.get(`/team/${team.id}`).expect(200)
    await agent.delete(`/team/${team.id}`)
    await agent.get(`/team/${team.id}`).expect(404)
  })
})
