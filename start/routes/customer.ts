import Route from '@ioc:Adonis/Core/Route'

Route.get('/customers', 'CustomersController.index').as('customers')
Route.get('/customer/create', 'CustomersController.create').as('create.customer')
Route.post('/customer', 'CustomersController.store').as('store.customer')
Route.get('/customer/:id', 'CustomersController.show').as('show.customer')
Route.put('/customer/:id', 'CustomersController.update').as('edit.customer')
Route.delete('/customer/:id', 'CustomersController.destroy').as('destroy.customer')
