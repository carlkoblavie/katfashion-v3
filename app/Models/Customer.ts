import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: String

  @column()
  public lastName: String

  @column()
  public phoneNumber: String

  @column()
  public otherPhoneNumber: String

  @column()
  public location: String

  @column()
  public gender: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
