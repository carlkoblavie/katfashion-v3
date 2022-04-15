import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PriceSubCategory from 'App/Models/PriceSubCategory'

export default class PriceSubCategorySeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await PriceSubCategory.createMany([
      {
        name: 'Alteration'
      },
      {
        name: 'Attire'
      },
      {
        name: 'Wedding'
      }
    ])
  }
}

