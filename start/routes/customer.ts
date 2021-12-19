import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/customers', 'CustomersController.index').as('customers')
  Route.get('/customers/create', 'CustomersController.create').as('create.customer')
  Route.post('/customer', 'CustomersController.store').as('store.customer')
  Route.get('/customer/:id', 'CustomersController.show').as('show.customer')
  Route.get('/customer/:id/edit', 'CustomersController.edit')
  Route.put('/customer/:id', 'CustomersController.update')
  Route.delete('/customer/:id', 'CustomersController.destroy').as('destroy.customer')
})
  .middleware('auth')
