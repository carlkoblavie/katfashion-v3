import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PriceListItem from 'App/Models/PriceListItem'
import CreatePriceListItemValidator from 'App/Validators/CreatePriceListItemValidator'
import UpdatePriceListItemValidator from 'App/Validators/UpdatePriceListItemValidator'
import PriceCategories from 'App/Models/PriceCategory'
import PriceSubCategories from 'App/Models/PriceSubCategory'

export default class PriceListItemsController {
  public async index({ view }: HttpContextContract) {
    const priceListItems = await PriceListItem.all()
    return view.render('admin/price_list_items/index', { priceListItems })
  }

  public async create({ view }: HttpContextContract) {
    const priceCategories = await PriceCategories.all()
    const priceSubCategories = await PriceSubCategories.all()
    console.log(priceSubCategories)
    return view.render('admin/price_list_items/create', { priceCategories, priceSubCategories })
  }

  public async destroy({ params, response, session }) {
    const priceListItem = await PriceListItem.findOrFail(params.id)

    await priceListItem.delete()

    session.flash('success', 'Price List Item deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const priceListItemId = params.id
    const priceListItem = await PriceListItem.findOrFail(priceListItemId)

    const {
      name,
      price,
      price_category_id,
      price_sub_category_id,
      code,
      gender,

    } = await request
      .validate(UpdatePriceListItemValidator)

    priceListItem.name = name
    priceListItem.price = price
    priceListItem.price_category_id = price_category_id
    priceListItem.price_sub_category_id = price_sub_category_id
    priceListItem.code = code
    priceListItem.gender = gender


    await priceListItem.save()

    session.flash('success', 'Price List Item updated successfully!')
    response.redirect().toRoute('PriceListItemsController.show', [priceListItem.id])
  }

  public async show({ view, params }: HttpContextContract) {
    const priceListItemId = params.id
    const priceListItem = await PriceListItem.findOrFail(priceListItemId)
    return view.render('admin/price_list_items/show', { priceListItem })
  }

  public async edit({ view, params }: HttpContextContract) {
    const priceListItemId = params.id
    const priceListItem = await PriceListItem.findOrFail(priceListItemId)
    return view.render('admin/price_list_items/edit', { priceListItem })
  }

  public async store({ session, response, request }: HttpContextContract) {
    const {
      name,
      price,
      price_category_id,
      price_sub_category_id,
      code,
      gender,

    } = await request
      .validate(CreatePriceListItemValidator)

    const priceListItem = await PriceListItem.create({
      name,
      price,
      price_category_id,
      price_sub_category_id,
      code,
      gender,

    })
    session.flash('sucess', 'Price List Item created successfully!')

    response.redirect().toRoute('PriceListItemsController.show', [priceListItem.id])
  }
}
