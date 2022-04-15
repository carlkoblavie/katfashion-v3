import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ReportCard from 'App/Models/ReportCard'
import CreateReportCardValidator from 'App/Validators/CreateReportCardValidator'
import UpdateReportCardValidator from 'App/Validators/UpdateReportCardValidator'

export default class ReportCardsController {
  public async index({ view }: HttpContextContract) {
    const reportCards = await ReportCard.all()
    return view.render('admin/report_cards/index', { reportCards })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/report_cards/create')
  }

  public async destroy({ params, response, session }) {
    const reportCard = await ReportCard.findOrFail(params.id)

    await reportCard.delete()

    session.flash('success', 'Report Card deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const reportCardId = params.id
    const reportCard = await ReportCard.findOrFail(reportCardId)

    const {
      name,
      price,
      price_category_id,
      price_sub_category_id,
      code,
      gender
    } = await request
      .validate(UpdateReportCardValidator)

    reportCard.name = name
    reportCard.price = price
    reportCard.price_category_id = price_category_id
    reportCard.price_sub_category_id = price_sub_category_id
    reportCard.code = code
    reportCard.gender = gender


    await reportCard.save()

    session.flash('success', 'Report Card updated successfully!')
    response.redirect().toRoute('ReportCardsController.show', [reportCard.id])
  }

  public async show({ view, params }: HttpContextContract) {
    const reportCardId = params.id
    const reportCard = await ReportCard.findOrFail(reportCardId)
    return view.render('admin/report_cards/show', { reportCard })
  }

  public async edit({ view, params }: HttpContextContract) {
    const reportCardId = params.id
    const reportCard = await ReportCard.findOrFail(reportCardId)
    return view.render('admin/report_cards/edit', { reportCard })
  }

  public async store({ session, response, request }: HttpContextContract) {
    const {
      name,
      price,
      price_category_id,
      price_sub_category_id,
      code,
      gender
    } = await request
      .validate(CreateReportCardValidator)

    const reportCard = await ReportCard.create({
      name,
      price,
      price_category_id,
      price_sub_category_id,
      code,
      gender
    })
    session.flash('sucess', 'Report Card created successfully!')

    response.redirect().toRoute('ReportCardsController.show', [reportCard.id])
  }
}
