import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignupValidator from 'App/Validators/SignupValidator'

export default class SignupController {
  public async create({ view }: HttpContextContract) {
    return view.render('/signup')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = await request.validate(SignupValidator)
    const user = await User.create({ email, password })
    await auth.login(user)
    response.redirect().toRoute('DashboardController.index')
  }
}
