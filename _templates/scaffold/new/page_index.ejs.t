---
to: resources/views/admin/<%= h.inflection.pluralize(name) %>/index.edge
---
@layout('admin/layouts/main')
@set('title', 'All <%= h.inflection.pluralize(h.inflection.titleize(name)) %>')
@set('subtitle', 'Add A <%= h.inflection.titleize(name) %>')
@set('subtitleroute',  route('<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>Controller.create'))
@section('body')


@if(flashMessages.has('success'))
<p class="text-green-600 text-sm" role="alert">
   {{ flashMessages.get('success') }}
</p>
@end
<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <% fields.split(',').forEach((fieldCombo) => { -%>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   <%= h.inflection.titleize(h.capitalize(fieldCombo.split(':')[0])) %>
                  </th>
                <% }) %>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
            </th>
           </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          @each(<%= h.changeCase.camelCase(name) %> in <%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>)
            <tr>
               <% fields.split(',').forEach((fieldCombo) => { %>
                   <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {{<%= h.changeCase.camelCase(name) %>.<%= fieldCombo.split(':')[0]%>}}
                  </td>
                <% }) %>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
			  <a href={{route('<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>Controller.show', [<%= h.changeCase.camelCase(name) %>.id])}} class="px-3 text-blue-600 hover:text-blue-800">Show</a> |
                <a href={{route('<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>Controller.edit', [<%= h.changeCase.camelCase(name) %>.id])}} class="px-3 text-green-600 hover:text-green-800">Edit</a> | 
                <form class="inline px-3 text-red-600" method="POST" action={{route('<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>Controller.destroy', [<%= h.changeCase.camelCase(name) %>.id])}}?_method=DELETE>
                  <button onclick="return confirm('Headsup! This will delete this <%= name %>. Are you sure?')">Delete</button>
                </form>
              </td>
            </tr>
           @end
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</p>
@end
