import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Customer from 'App/Models/Customer'

export default class CustomersController {
  public async index({ view }: HttpContextContract) {
    const data = Customer.all()
    return view.render('admin/customers', { data })
  }

  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Customer/Create')
  }

  public async destroy({ params, response, session }) {
    const customer = await Customer.find(params.id)

    await customer.delete()

    session.flash('message', 'Customer added successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const customerId = params.id
    const customer = await Customer.find(customerId)

    const updatedCustomer = schema.create({
      first_name: schema.string({ trim: true }, [
        rules.required(),
        rules.alpha(),
        rules.minLength(2)
      ]),
      location: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(2)
      ]),
      last_name: schema.string({ trim: true }, [
        rules.required(),
        rules.alpha(),
        rules.minLength(2)
      ]),
      gender: schema.enum(['Male', 'Female']),
      phone_number: schema.string({ trim: true }, [
        rules.mobile({ locales: ['en-GH'] }),
        rules.unique({ table: 'customers', column: 'phone_number', caseInsensitive: true, whereNot: { id: customer.id } }),
        rules.unique({ table: 'customers', column: 'other_phone_number', caseInsensitive: true, whereNot: { id: customer.id } })

      ]),
      other_phone_number: schema.string.optional({ trim: true }, [
        rules.mobile({ locales: ['en-GH'] }),
        rules.unique({ table: 'customers', column: 'phone_number', caseInsensitive: true, whereNot: { id: customer.id } }),
        rules.unique({ table: 'customers', column: 'other_phone_number', caseInsensitive: true, whereNot: { id: customer.id } })
      ])
    })

    try {
      await request.validate({
        schema: updatedCustomer,
        messages: {
          required: '{{field}} is required',
          alpha: 'Enter a valid {{field}}, having only alphabets',
          minLength: '{{field}} should be more than {{options.minLength}} characters',
          regex: 'Please enter a valid mobile number',
          mobile: 'Enter a valid GH {{field}}',
          'phone_number.unique': '{{field}} is already registered with a customer'
        }
      })

      const data = await request.only(['first_name', 'last_name', 'gender', 'phone_number', 'other_phone_number', 'location'])

      customer.firstName = data.first_name
      customer.lastName = data.last_name
      customer.gender = data.gender
      customer.phoneNumber = data.phone_number
      customer.otherPhoneNumber = data.other_phone_number
      customer.location = data.location

      await customer.save()

      session.flash('message', 'Customer updated successfully!')
      response.redirect().status(303).back()
    } catch (error) {
      session.flash('errors', error.messages)
      response.redirect().status(303).back()
    }
  }

  public async show({ inertia, params }: HttpContextContract) {
    const customerId = params.id
    const customer = Customer.find(customerId)
    return inertia.render('Customer/Edit', { customer })
  }

  public async store({ session, response, request }: HttpContextContract) {
    const newCustomerSchema = schema.create({
      first_name: schema.string({ trim: true }, [
        rules.required(),
        rules.alpha(),
        rules.minLength(2)
      ]),
      location: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(2)
      ]),
      last_name: schema.string({ trim: true }, [
        rules.required(),
        rules.alpha(),
        rules.minLength(2)
      ]),
      gender: schema.enum(['Male', 'Female']),
      phone_number: schema.string({ trim: true }, [
        rules.mobile({ locales: ['en-GH'] }),
        rules.unique({ table: 'customers', column: 'phone_number', caseInsensitive: true }),
        rules.unique({ table: 'customers', column: 'other_phone_number', caseInsensitive: true })

      ]),
      other_phone_number: schema.string.optional({ trim: true }, [
        rules.mobile({ locales: ['en-GH'] }),
        rules.unique({ table: 'customers', column: 'phone_number', caseInsensitive: true }),
        rules.unique({ table: 'customers', column: 'other_phone_number', caseInsensitive: true })
      ])
    })
    try {
      await request.validate({
        schema: newCustomerSchema,
        messages: {
          required: '{{field}} is required',
          alpha: 'Enter a valid {{field}}, having only alphabets',
          minLength: '{{field}} should be more than {{options.minLength}} characters',
          regex: 'Please enter a valid mobile number',
          mobile: 'Enter a valid GH {{field}}',
          'phone_number.unique': '{{field}} is already registered with a customer'
        }
      })
      const data = await request.only(['first_name', 'last_name', 'gender', 'phone_number', 'other_phone_number', 'location'])
      await Customer.create(data)
      session.flash('message', 'Customer added successfully!')
      response.redirect().toRoute('CustomersController.index')
    } catch (error) {
      session.flash('errors', error.messages)
      response.redirect().back()
    }
  }
}


