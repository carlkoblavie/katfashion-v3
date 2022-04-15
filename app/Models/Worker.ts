import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Worker extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public first_name: String

  @column()
  public last_name: String

  @column()
  public phone_number: String

  @column()
  public other_phone_number: String

  @column()
  public role: String


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
