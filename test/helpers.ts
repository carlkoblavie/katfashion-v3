import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export const loginUser = async (agent) => {
  const { $attributes: user } = await UserFactory.make()

  await User.create({ email: user.email, password: user.password })

  await agent
    .post('/login')
    .field('email', user.email)
    .field('password', user.password)
}
