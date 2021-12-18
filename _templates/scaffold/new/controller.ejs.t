---
to: app/Controllers/Http/<%= h.inflection.pluralize(h.capitalize(name)) %>Controller.ts
---
import <%= h.capitalize(name) %> from 'App/Models/<%= h.capitalize(name) %>'
import Create<%= h.capitalize(name) %>Validator from 'App/Validators/Create<%= h.capitalize(name) %>Validator'
import Update<%= h.capitalize(name) %>ValidatorValidator from 'App/Validators/Update<%= h.capitalize(name) %>Validator'

export default class <%= h.inflection.pluralize(h.capitalize(name)) %>Controller {
  public async index({ view }: HttpContextContract) {
    const  <%= h.inflection.pluralize(name) %> = await <%= h.capitalize(name) %>.all()
    return view.render('admin/<%= h.inflection.pluralize(name) %>/index', { <%= h.inflection.pluralize(name) %> })
  }

  public async create({ view }: HttpContextContract) {
    return view.render(`admin/<%= h.inflection.pluralize(name) %>/create`)
  }

  public async destroy({ params, response, session }) {
    const <%= name %> = await <%= h.capitalize(name) %>.find(params.id)

    await <%= name %>.delete()

    session.flash('success', '<%= h.capitalize(name) %> deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const <%= name %>Id = params.id
    const <%= name %> = await <%= h.capitalize(name) %>.find(<%= name %>Id)
  
  const { } = await request
  .validate(Update<%= h.capitalize(name) %>Validator)

      await <%= name %>.save()

    session.flash('success', '<%= h.capitalize(name) %> updated successfully!')
    response.redirect().toRoute('<%= h.inflection.pluralize(h.capitalize(name)) %>Controller.show', [<%= name %>.id])
  }

  public async show({ view, params }: HttpContextContract) {
   const <%= name %>Id = params.id
    const <%= name %> = await <%= h.capitalize(name) %>.findOrFail(<%= name %>Id)
    return view.render('admin/<%= h.inflection.pluralize(name) %>/show', {  })
  }
  
  public async edit({ view, params }: HttpContextContract) {
    const <%= name %>Id = params.id
    const <%= name %> = await <%= h.capitalize(name) %>.findOrFail(<%= name %>Id)
    return view.render('admin/<%= h.inflection.pluralize(name) %>/edit', {  })
  }

  public async store({ session, response, request }: HttpContextContract) {
  const {  } = await request
  .validate(Create<%= h.capitalize(name) %>Validator)
  
  const <%= name %> = await <%= h.capitalize(name) %>.create({  })
  session.flash('sucess', '<%= h.capitalize(name) %> created successfully!')

  response.redirect().toRoute('<%= h.inflection.pluralize(h.capitalize(name)) %>Controller.show', [<%= name %>.id])
  }
}
