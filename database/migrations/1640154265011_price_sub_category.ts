import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PriceSubCategories extends BaseSchema {
  protected tableName = 'price_sub_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamps(true, true)
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
