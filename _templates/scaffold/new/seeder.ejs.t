---
to: database/seeders<%= h.changeCase.pascalCase(name) %>.ts
---
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { <%= h.changeCase.pascalCase(name) %>Factory } from 'Database/factories'

export default class <%= h.changeCase.pascalCase(name) %>Seeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await <%= h.changeCase.pascalCase(name) %>Factory.createMany(4) 
    }
}

