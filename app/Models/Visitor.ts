import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Visitor extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public name: String

  @column()
  public age: Integer

  @column()
  public location: String


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
