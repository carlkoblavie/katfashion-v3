---
to: app/Controllers/Http/<%= h.changeCase.pascalCase(h.inflection.pluralize(name)) %>Controller.ts
---
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import <%= h.changeCase.pascalCase(name)  %> from 'App/Models/<%= h.changeCase.pascalCase(name) %>'
import Create<%= h.changeCase.pascalCase(name)  %>Validator from 'App/Validators/Create<%= h.changeCase.pascalCase(name) %>Validator'
import Update<%= h.changeCase.pascalCase(name) %>Validator from 'App/Validators/Update<%= h.changeCase.pascalCase(name) %>Validator'

export default class <%= h.changeCase.pascalCase(h.inflection.pluralize(name)) %>Controller {
  public async index({ view }: HttpContextContract) {
    const  <%= h.inflection.pluralize(h.changeCase.camelCase(name)) %> = await <%= h.changeCase.pascalCase(name) %>.all()
    return view.render('admin/<%= h.inflection.pluralize(name) %>/index', { <%= h.inflection.pluralize(h.changeCase.camelCase(name)) %> })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/<%= h.inflection.pluralize(name) %>/create')
  }

  public async destroy({ params, response, session }) {
    const <%= h.changeCase.camelCase(name) %> = await <%= h.changeCase.pascalCase(name) %>.findOrFail(params.id)

    await <%= h.changeCase.camelCase(name) %>.delete()

    session.flash('success', '<%= h.inflection.titleize(name) %> deleted successfully!')
    response.redirect().back()
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    const <%= h.changeCase.camelCase(name) %>Id = params.id
    const <%= h.changeCase.camelCase(name) %> = await <%= h.changeCase.pascalCase(name) %>.findOrFail(<%= h.changeCase.camelCase(name) %>Id)
  
    const {
    <% fields.split(',').forEach((fieldCombo) => { -%>
    <% const [fieldName] = fieldCombo.split(':') -%>
    <%= fieldName -%>,
    <% }) %>
    } = await request
  .validate(Update<%= h.changeCase.pascalCase(name) %>Validator)
    
  <% fields.split(',').forEach((fieldCombo) => { -%>
    <% const [fieldName] = fieldCombo.split(':') -%>
    <%= h.changeCase.camelCase(name) %>.<%= fieldName -%> = <%= fieldName %>
  <% }) %>

   await <%= h.changeCase.camelCase(name) %>.save()

    session.flash('success', '<%= h.inflection.titleize(name) %> updated successfully!')
    response.redirect().toRoute('<%= h.changeCase.pascalCase(h.inflection.pluralize(name)) %>Controller.show', [<%= h.changeCase.camelCase(name) %>.id])
  }

  public async show({ view, params }: HttpContextContract) {
    const <%= h.changeCase.camelCase(name) %>Id = params.id
    const <%= h.changeCase.camelCase(name) %> = await <%= h.changeCase.pascalCase(name) %>.findOrFail(<%= h.changeCase.camelCase(name) %>Id)
    return view.render('admin/<%= h.inflection.pluralize(name) %>/show', { <%= h.changeCase.camelCase(name) %> })
  }
  
  public async edit({ view, params }: HttpContextContract) {
    const <%= h.changeCase.camelCase(name) %>Id = params.id
    const <%= h.changeCase.camelCase(name) %> = await <%= h.changeCase.pascalCase(name) %>.findOrFail(<%= h.changeCase.camelCase(name) %>Id)
    return view.render('admin/<%= h.inflection.pluralize(name) %>/edit', { <%= h.changeCase.camelCase(name) %>})
  }

  public async store({ session, response, request }: HttpContextContract) {
  const { 
  <% fields.split(',').forEach((fieldCombo) => { -%>
    <% const [fieldName] = fieldCombo.split(':') -%>
    <%= fieldName %>,
    <% }) %>
    } = await request
  .validate(Create<%= h.changeCase.pascalCase(name) %>Validator)
  
    const <%= h.changeCase.camelCase(name) %> = await <%= h.changeCase.pascalCase(name) %>.create({ 
    <% fields.split(',').forEach((fieldCombo) => { -%>
    <% const [fieldName] = fieldCombo.split(':') -%>
    <%= fieldName %>,
    <% }) %>
  })
  session.flash('sucess', '<%= h.inflection.titleize(name) %> created successfully!')

  response.redirect().toRoute('<%= h.changeCase.pascalCase(h.inflection.pluralize(name)) %>Controller.show', [<%= h.changeCase.camelCase(name) %>.id])
  }
}
