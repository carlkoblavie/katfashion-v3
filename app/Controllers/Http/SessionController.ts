import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionController {
  public async create({ view }: HttpContextContract) {
    return view.render('login')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    await auth.attempt(request.input('email'), request.input('password'))
    response.redirect().toRoute('DashboardController.index')
  }
}
