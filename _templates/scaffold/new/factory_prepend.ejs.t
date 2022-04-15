---
inject: true
to: database/factories/index.ts 
skip_if: <%= h.changeCase.pascalCase(name) %> from 'App/Models/<%= h.changeCase.pascalCase(name) -%>'
after: "import Factory from "
append: true
---
import <%= h.changeCase.pascalCase(name) %> from 'App/Models/<%= h.changeCase.pascalCase(name) -%>'
