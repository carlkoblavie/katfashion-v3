import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Unnamed from 'App/Models/Unnamed'
import CreateUnnamedValidator from 'App/Validators/CreateUnnamedValidator'
import UpdateUnnamedValidator from 'App/Validators/UpdateUnnamedValidator'

export default class UnnamedsController {
  public async index({ view }: HttpContextContract) {
    const  unnameds = await Unnamed.all()
    return view.render('admin/unnameds/index', { unnameds })
  }

  public async create({ view }: HttpContextContract) {
    return view.render(`admin/unnameds/create`)
  }

  public async destroy({ params, response, session }) {
    const unnamed = await Unnamed.find(params.id)

    await unnamed.delete()

    session.flash('success', 'Unnamed deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const unnamedId = params.id
    const unnamed = await Unnamed.find(unnamedId)
  
    const {
            name,
            price,
            price_category_id,
            price_sub_category_id,
            code,
            gender,
    
    } = await request
  .validate(UpdateUnnamedValidator)
    
          unnamed.name = name
          unnamed.price = price
          unnamed.price_category_id = price_category_id
          unnamed.price_sub_category_id = price_sub_category_id
          unnamed.code = code
          unnamed.gender = gender
  

   await unnamed.save()

    session.flash('success', 'Unnamed updated successfully!')
    response.redirect().toRoute('UnnamedController.show', [unnamed.id])
  }

  public async show({ view, params }: HttpContextContract) {
   const unnamedId = params.id
    const unnamed = await Unnamed.findOrFail(unnamedId)
    return view.render('admin/unnameds/show', { unnamed })
  }
  
  public async edit({ view, params }: HttpContextContract) {
    const unnamedId = params.id
    const unnamed = await Unnamed.findOrFail(unnamedId)
    return view.render('admin/unnameds/edit', { unnamed})
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
  .validate(CreateUnnamedValidator)
  
    const unnamed = await Unnamed.create({ 
            name,
            price,
            price_category_id,
            price_sub_category_id,
            code,
            gender,
    
  })
  session.flash('sucess', 'Unnamed created successfully!')

  response.redirect().toRoute('UnnamedsController.show', [unnamed.id])
  }
}
