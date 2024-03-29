import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PriceListItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public name: String

  @column()
  public price: Integer

  @column()
  public price_category_id: Integer

  @column()
  public price_sub_category_id: Integer

  @column()
  public code: String

  @column()
  public gender: String


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
