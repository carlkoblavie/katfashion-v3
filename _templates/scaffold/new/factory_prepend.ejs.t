---
inject: true
to: database/factories/index.ts 
skip_if: <%= h.capitalize(name) %> from 'App/Models/<%= h.capitalize(name) -%>'
after: "import Factory from "
append: true
---
import <%= h.capitalize(name) %> from 'App/Models/<%= h.capitalize(name) -%>'
