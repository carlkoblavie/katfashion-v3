---
inject: true
to: database/factories/index.ts 
skip_if: Route.resource('<%= h.inflection.pluralize(name) %>', '<%= h.inflection.pluralize(h.capitalize(name)) %>Controller')
append: true
---

export const <%= h.capitalize(name) %>Factory = Factory
  .define(<%= h.capitalize(name) %>, ({ faker }) => {
    return {
  <% fields.split(',').forEach((fieldCombo) => { -%>
    <%=fieldCombo.split(':')[0] %>: faker.lorem.word()
  <% }) -%>
  }
})
.build()
