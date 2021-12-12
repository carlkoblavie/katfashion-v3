import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await User.createMany([
      {
        email: 'cskoblavie@gmail.com',
        password: 'secret',
      },
      {
        email: 'carl@gmail.com',
        password: 'secret',
      },
    ])
  }
}
