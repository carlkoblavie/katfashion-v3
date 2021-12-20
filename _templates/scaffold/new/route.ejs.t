---
inject: true
to: start/routes.ts
skip_if: Route.resource('<%= h.inflection.pluralize(name) %>', '<%= h.inflection.pluralize(h.capitalize(name)) %>Controller')
append: true
---
Route.resource('<%= h.inflection.pluralize(name) %>', '<%= h.inflection.pluralize(h.capitalize(name)) %>Controller')
