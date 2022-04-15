---
to: database/migrations/<%= new Date().getTime() %>_<%= h.inflection.pluralize(name) %>.ts
---
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class <%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %> extends BaseSchema {
  protected tableName = '<%= h.inflection.pluralize(name) %>'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
    table.increments('id').primary()
  <% fields.split(',').forEach((fieldCombo) => { -%>
      table.<%=fieldCombo.split(':')[1] -%>('<%=fieldCombo.split(':')[0] %>')
  <% }) -%>
      table.timestamps(true, true)
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
