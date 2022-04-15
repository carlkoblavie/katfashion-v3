import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PriceCategoryFactory } from 'Database/factories'

export default class PriceCategorySeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await PriceCategoryFactory.createMany([
      {
        name: 'Next Day'
      },
      {
        name: 'Regualr'
      },
      {
        name: 'Express'
      }
    ])
  }
}

