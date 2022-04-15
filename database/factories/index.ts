import Factory from '@ioc:Adonis/Lucid/Factory'
import Unnamed from 'App/Models/Unnamed'

import Price_list_item from 'App/Models/Price_list_item'

import Price_sub_category from 'App/Models/Price_sub_category'

import PriceListItem from 'App/Models/PriceListItem'

import Worker from 'App/Models/Worker'
import Customer from 'App/Models/Customer'
import User from 'App/Models/User'
import { ghMobileNumber } from './helpers'

export const CustomerFactory = Factory
  .define(Customer, ({ faker }) => {
    let genders = ['Female', 'Male'];
    let gender = faker.random.arrayElement(genders);

    return {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      location: faker.address.city(),
      gender: gender
    }
  })
  .build()

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .build()

export const WorkerFactory = Factory
  .define(Worker, ({ faker }) => {
    return {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone_number: ghMobileNumber(),
      other_phone_number: ghMobileNumber(),
      role: faker.random.arrayElement(['designer', 'tailor']),
    }
  })
  .build()

export const PriceListItemFactory = Factory
  .define(PriceListItem, ({ faker }) => {
    return {
      item: faker.lorem.word(),
      price: faker.lorem.word(),
      code: faker.lorem.word(),
      category_id: faker.lorem.word(),
    }
  })
  .build()

export const Price_sub_categoryFactory = Factory
  .define(Price_sub_category, ({ faker }) => {
    return {
      name: faker.lorem.word(),
    }
})
.build()

export const Price_list_itemFactory = Factory
  .define(Price_list_item, ({ faker }) => {
    return {
      name: faker.lorem.word(),
      price: faker.lorem.word(),
      price_category_id: faker.lorem.word(),
      price_sub_category_id: faker.lorem.word(),
      code: faker.lorem.word(),
      gender: faker.lorem.word(),
    }
})
.build()

export const Price_list_itemFactory = Factory
  .define(Price_list_item, ({ faker }) => {
    return {
      name: faker.lorem.word(),
      price: faker.lorem.word(),
      price_category_id: faker.lorem.word(),
      price_sub_category_id: faker.lorem.word(),
      code: faker.lorem.word(),
      gender: faker.lorem.word(),
    }
})
.build()

export const UnnamedFactory = Factory
  .define(Unnamed, ({ faker }) => {
    return {
      name: faker.lorem.word(),
      price: faker.lorem.word(),
      price_category_id: faker.lorem.word(),
      price_sub_category_id: faker.lorem.word(),
      code: faker.lorem.word(),
      gender: faker.lorem.word(),
    }
})
.build()

