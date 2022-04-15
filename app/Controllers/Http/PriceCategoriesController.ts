import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PriceCategory from 'App/Models/PriceCategory'
import CreatePriceCategoryValidator from 'App/Validators/CreatePriceCategoryValidator'
import UpdatePriceCategoryValidator from 'App/Validators/UpdatePriceCategoryValidator'

export default class PriceCategoriesController {
  public async index({ view }: HttpContextContract) {
    const priceCategories = await PriceCategory.all()
    return view.render('admin/price_category/index', { priceCategories })
  }

  public async create({ view }: HttpContextContract) {
    return view.render(`admin/price_category/create`)
  }

  public async destroy({ params, response, session }) {
    const priceCategory = await PriceCategory.findOrFail(params.id)

    await priceCategory.delete()

    session.flash('success', 'PriceCategory deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const priceCategoryId = params.id
    const priceCategory = await PriceCategory.findOrFail(priceCategoryId)

    const {
      name,

    } = await request
      .validate(UpdatePriceCategoryValidator)

    priceCategory.name = name


    await priceCategory.save()

    session.flash('success', 'PriceCategory updated successfully!')
    response.redirect().toRoute('PriceCategoriesController.show', [priceCategory.id])
  }

  public async show({ view, params }: HttpContextContract) {
    const priceCategoryId = params.id
    const priceCategory = await PriceCategory.findOrFail(priceCategoryId)
    return view.render('admin/price_category/show', { priceCategory })
  }

  public async edit({ view, params }: HttpContextContract) {
    const priceCategoryId = params.id
    const priceCategory = await PriceCategory.findOrFail(priceCategoryId)
    return view.render('admin/price_category/edit', { priceCategory })
  }

  public async store({ session, response, request }: HttpContextContract) {
    const { name } = await request
      .validate(CreatePriceCategoryValidator)

    const priceCategory = await PriceCategory.create({ name })
    session.flash('sucess', 'PriceCategory created successfully!')

    response.redirect().toRoute('PriceCategoriesController.show', [priceCategory.id])
  }
}
