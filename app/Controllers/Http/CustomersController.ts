import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import CreateCustomerValidator from 'App/Validators/CreateCustomerValidator'
import UpdateCustomerValidator from 'App/Validators/UpdateCustomerValidator'


export default class CustomersController {
  public async index({ view }: HttpContextContract) {
    const customers = await Customer.all()
    return view.render('admin/customers/index', { customers })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/customers/create')
  }

  public async destroy({ params, response, session }) {
    const customer = await Customer.find(params.id)

    await customer.delete()

    session.flash('success', 'Customer deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const customerId = params.id
    const customer = await Customer.find(customerId)
	  
	  const { first_name, last_name, location, gender, phone_number, other_phone_number } = await request
	  	.validate(UpdateCustomerValidator)

      customer.firstName = first_name
      customer.lastName = last_name
      customer.gender = gender
      customer.phoneNumber = phone_number
      customer.otherPhoneNumber = other_phone_number
      customer.location = location

      await customer.save()

      session.flash('success', 'Customer updated successfully!')
      response.redirect().toRoute('CustomersController.show', [customer.id])
  }

  public async show({ view, params }: HttpContextContract) {
    const customerId = params.id
    const customer = await Customer.findOrFail(customerId)
    return view.render('admin/customers/show', { customer })
  }
  
  public async edit({ view, params }: HttpContextContract) {
    const customerId = params.id
    const customer = await Customer.findOrFail(customerId)
    return view.render('admin/customers/edit', { customer })
  }

  public async store({ session, response, request }: HttpContextContract) {
	  const { first_name, last_name, location, gender, phone_number, other_phone_number } = await request
	  	.validate(CreateCustomerValidator)
	  
	  const customer = await Customer.create({
	  	first_name, last_name, location, gender, phone_number, other_phone_number
	  })
	  session.flash('sucess', 'Customer created successfully!')
	  response.redirect().toRoute('CustomersController.show', [customer.id])
  }
}


