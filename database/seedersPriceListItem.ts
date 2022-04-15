import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PriceListItemFactory } from 'Database/factories'

export default class PriceListItemSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await PriceListItemFactory.createMany(4) 
    }
}

