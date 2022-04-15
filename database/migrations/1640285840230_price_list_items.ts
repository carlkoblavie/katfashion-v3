import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PriceListItems extends BaseSchema {
  protected tableName = 'price_list_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.integer('price').notNullable()
      table.integer('price_category_id').unsigned().notNullable().references('price_categories.id')
      table.integer('price_sub_category_id').unsigned().notNullable().references('price_sub_categories.id')
      table.string('code').notNullable()
      table.string('gender').notNullable()
      table.timestamps(true, true)
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
