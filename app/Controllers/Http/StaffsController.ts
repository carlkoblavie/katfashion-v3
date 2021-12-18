import Staff from 'App/Models/Staff'
import CreateCustomerValidator from 'App/Validators/CreateStaffValidator'
import UpdateCustomerValidator from 'App/Validators/UpdateStaffValidator'

export default class StaffsController {
  public async index({ view }: HttpContextContract) {
    const  staffs = await Staff.all()
    return view.render('admin/staffs/index', { staffs })
  }

  public async create({ view }: HttpContextContract) {
    return view.render(`admin/staffs/create`)
  }

  public async destroy({ params, response, session }) {
    const staff = await Staff.find(params.id)

    await staff .delete()

    session.flash('success', 'Staff deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {

    session.flash('success', 'Customer updated successfully!')
    response.redirect().toRoute('StaffsController.show', [staff.id])
  }

  public async show({ view, params }: HttpContextContract) {

    return view.render('admin/customers/show', {  })
  }
  
  public async edit({ view, params }: HttpContextContract) {

    return view.render('admin/customers/edit', {  })
  }

  public async store({ session, response, request }: HttpContextContract) {

  response.redirect().toRoute('StaffsController.show', [customer.id])
  }
}
