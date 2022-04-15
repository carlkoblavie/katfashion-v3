import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PriceSubCategory from 'App/Models/PriceSubCategory'
import CreatePriceSubCategoryValidator from 'App/Validators/CreatePriceSubCategoryValidator'
import UpdatePriceSubCategoryValidator from 'App/Validators/UpdatePriceSubCategoryValidator'

export default class PriceSubCategoriesController {
  public async index({ view }: HttpContextContract) {
    const priceSubCategories = await PriceSubCategory.all()
    return view.render('admin/price_sub_categories/index', { priceSubCategories })
  }

  public async create({ view }: HttpContextContract) {
    return view.render(`admin/price_sub_categories/create`)
  }

  public async destroy({ params, response, session }) {
    const priceSubCategory = await PriceSubCategory.findOrFail(params.id)

    await priceSubCategory.delete()

    session.flash('success', 'Price sub Category deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const priceSubCategoryId = params.id
    const priceSubCategory = await PriceSubCategory.findOrFail(priceSubCategoryId)

    const { name } = await request
      .validate(UpdatePriceSubCategoryValidator)

    priceSubCategory.name = name

    await priceSubCategory.save()

    session.flash('success', 'Price Sub Category updated successfully!')
    response.redirect().toRoute('PriceSubCategoriesController.show', [priceSubCategory.id])
  }

  public async show({ view, params }: HttpContextContract) {
    const priceSubCategoryId = params.id
    const priceSubCategory = await PriceSubCategory.findOrFail(priceSubCategoryId)
    return view.render('admin/price_sub_categories/show', { priceSubCategory })
  }

  public async edit({ view, params }: HttpContextContract) {
    const priceSubCategoryId = params.id
    const priceSubCategory = await PriceSubCategory.findOrFail(priceSubCategoryId)
    return view.render('admin/price_sub_categories/edit', { priceSubCategory })
  }

  public async store({ session, response, request }: HttpContextContract) {
    const {
      name,

    } = await request
      .validate(CreatePriceSubCategoryValidator)

    const priceSubCategory = await PriceSubCategory.create({
      name,

    })
    session.flash('sucess', 'Price Sub Category created successfully!')

    response.redirect().toRoute('PriceSubCategoriesController.show', [priceSubCategory.id])
  }
}
