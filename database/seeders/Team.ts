import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Team from 'App/Models/Team'
import { TeamFactory } from 'Database/factories'

export default class TeamSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await TeamFactory.createMany(4) 
    }
}

