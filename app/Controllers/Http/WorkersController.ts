import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Worker from 'App/Models/Worker'
import CreateWorkerValidator from 'App/Validators/CreateWorkerValidator'
import UpdateWorkerValidator from 'App/Validators/UpdateWorkerValidator'

export default class WorkersController {
  public async index({ view }: HttpContextContract) {
    const workers = await Worker.all()
    return view.render('admin/workers/index', { workers })
  }

  public async create({ view }: HttpContextContract) {
    return view.render(`admin/workers/create`)
  }

  public async destroy({ params, response, session }) {
    const worker = await Worker.find(params.id)

    await worker.delete()

    session.flash('success', 'Worker deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const workerId = params.id
    const worker = await Worker.find(workerId)

    const {
      first_name,
      last_name,
      phone_number,
      other_phone_number,
      role,

    } = await request
      .validate(UpdateWorkerValidator)

    worker.first_name = first_name
    worker.last_name = last_name
    worker.phone_number = phone_number
    worker.other_phone_number = other_phone_number
    worker.role = role

    await worker.save()

    session.flash('success', 'Worker updated successfully!')
    response.redirect().toRoute('WorkersController.show', [worker.id])
  }

  public async show({ view, params }: HttpContextContract) {
    const workerId = params.id
    const worker = await Worker.findOrFail(workerId)
    return view.render('admin/workers/show', { worker })
  }

  public async edit({ view, params }: HttpContextContract) {
    const workerId = params.id
    const worker = await Worker.findOrFail(workerId)
    return view.render('admin/workers/edit', { worker })
  }

  public async store({ session, response, request }: HttpContextContract) {
    const {
      first_name,
      last_name,
      phone_number,
      other_phone_number,
      role,

    } = await request
      .validate(CreateWorkerValidator)

    const worker = await Worker.create({
      first_name,
      last_name,
      phone_number,
      other_phone_number,
      role,
    })
    session.flash('sucess', 'Worker created successfully!')

    response.redirect().toRoute('WorkersController.show', [worker.id])
  }
}
