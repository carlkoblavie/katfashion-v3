/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'SessionController.index')
Route.get('/login', 'SessionController.create')
Route.post('/login', 'SessionController.store')

Route.post('/signup', 'SignupController.store')
Route.get('/signup', 'SignupController.create')

Route.get('/admin', 'DashboardController.index').middleware('auth')

import './routes/customer'

Route.resource('workers', 'WorkersController').middleware('auth')

Route.resource('price_categories', 'PriceCategoriesController').middleware('auth')

Route.resource('price_sub_categories', 'PriceSubCategoriesController').middleware('auth')

Route.resource('price_list_items', 'PriceListItemsController')

