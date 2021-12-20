---
to: database/seeders/<%= h.capitalize(name) %>.ts
---
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import <%= h.capitalize(name) %> from 'App/Models/<%= h.capitalize(name) %>'
import { <%= h.capitalize(name) %>Factory } from 'Database/factories'

export default class <%= h.capitalize(name) %>Seeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await <%= h.capitalize(name) %>Factory.createMany(4) 
    }
}

