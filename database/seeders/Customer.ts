import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Customer from 'App/Models/Customer'

export default class CustomerSeeder extends BaseSeeder {
  public async run () {
   await Customer.createMany([
   {
	   firstName: 'Carl',
	   lastName: 'Koblavie',
	   phoneNumber: '0244139649',
	   otherPhoneNumber: '0233887659',
	   location: 'Tema',
	   gender: 'male'
   },
   {
	   firstName: 'John',
	   lastName: 'Kwofi',
	   phoneNumber: '0244139009',
	   otherPhoneNumber: '0233887670',
	   location: 'Tema',
	   gender: 'male'
   },
   {
	   firstName: 'Alice',
	   lastName: 'Sefla',
	   phoneNumber: '0222339887',
	   otherPhoneNumber: '02338876001',
	   location: 'Tema',
	   gender: 'female'
   },
   {
	   firstName: 'Hannah',
	   lastName: 'Dumpty',
	   phoneNumber: '0244139222',
	   otherPhoneNumber: '0233887988',
	   location: 'Tema',
	   gender: 'female'
   },
   {
	   firstName: 'Carlos',
	   lastName: 'Kobla',
	   phoneNumber: '0244139555',
	   otherPhoneNumber: '0233887666',
	   location: 'Tema',
	   gender: 'male'
   },
   {
	   firstName: 'Johnas',
	   lastName: 'Kwofison',
	   phoneNumber: '0244139019',
	   otherPhoneNumber: '0233987670',
	   location: 'Tema',
	   gender: 'male'
   },
   {
	   firstName: 'Ali',
	   lastName: 'Sefakor',
	   phoneNumber: '0222449887',
	   otherPhoneNumber: '02300876001',
	   location: 'Tema',
	   gender: 'female'
   },
   {
	   firstName: 'Hannifa',
	   lastName: 'Dumpa',
	   phoneNumber: '0244144222',
	   otherPhoneNumber: '0239987988',
	   location: 'Tema',
	   gender: 'female'
   }
   ])
  }
}
