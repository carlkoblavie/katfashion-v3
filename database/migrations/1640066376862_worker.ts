import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Workers extends BaseSchema {
  protected tableName = 'workers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('phone_number')
      table.string('other_phone_number')
      table.string('role')
      table.timestamps(true, true)
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
