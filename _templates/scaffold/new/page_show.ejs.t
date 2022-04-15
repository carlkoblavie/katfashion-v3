---
to: resources/views/admin/<%= h.inflection.pluralize(name) %>/show.edge
---
@layout('admin/layouts/main')
@set('title', `Add A <%= h.inflection.titleize(name) %>`)
@set('subtitle', `All <%= h.inflection.pluralize(h.inflection.titleize(name)) %>`)
@set('subtitleroute', route(`<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>Controller.index`))
@section('body')
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="border-t border-gray-200">
    <dl>
        <% fields.split(',').forEach((fieldCombo) => { %>
             <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-10 sm:px-6">
               <dt class="text-sm font-medium text-gray-500">
                <%= h.inflection.titleize(fieldCombo.split(':')[0]) %> 
               </dt>
               <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ <%= h.changeCase.camelCase(name) %>.<%= fieldCombo.split(':')[0]%>}}
               </dd>
             </div>
          <% }) %>
    </dl>
  </div>
</div>
</div>
@end
