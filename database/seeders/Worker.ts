import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { WorkerFactory } from 'Database/factories'

export default class WorkerSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await WorkerFactory.createMany(4) 
    }
}

