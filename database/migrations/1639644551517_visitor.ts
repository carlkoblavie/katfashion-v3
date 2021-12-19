import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Visitors extends BaseSchema {
  protected tableName = 'visitors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('name')
      table.integer('age')
      table.string('location')
      table.timestamps(true, true)
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

