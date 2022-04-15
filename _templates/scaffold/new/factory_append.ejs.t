---
inject: true
to: database/factories/index.ts 
skip_if: export const <%= h.changeCase.pascalCase(name) %>Factory
append: true
---

export const <%= h.changeCase.pascalCase(name) %>Factory = Factory
  .define(<%= h.capitalize(name) %>, ({ faker }) => {
    return {
  <% fields.split(',').forEach((fieldCombo) => { -%>
    <%=fieldCombo.split(':')[0] %>: faker.lorem.word(),
  <% }) -%>
  }
})
.build()
