import Factory from '@ioc:Adonis/Lucid/Factory'

import Customer from 'App/Models/Customer'

export const CustomerFactory = Factory
	.define(Customer, ({ faker}) => {
		let genders = [ 'Female' , 'Male' ];
		let gender = faker.random.arrayElement(genders);
		
		return {
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			location: faker.address.city(),
			gender: gender
		}
	})
	.build()
