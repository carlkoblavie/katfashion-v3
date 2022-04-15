---
to: resources/views/admin/<%=  h.inflection.pluralize(name) %>/create.edge
---
@layout('admin/layouts/main')
@set('title', `Add A <%= h.inflection.titleize(name) %>`)
@set('subtitle', `All <%= h.inflection.pluralize(h.inflection.titleize(name)) %>`)
@set('subtitleroute', route(`<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>Controller.index`))
@section('body')

<form action="{{route('<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>Controller.store')}}" method="post">
			<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div class="max-w-md w-full space-y-9">
					<div class="relative w-full mt-10 space-y-8">
          <% fields.split(',').forEach((fieldCombo) => { %>
               <div class="relative">
							<label class="font-medium text-gray-900"><%= h.inflection.titleize(fieldCombo.split(':')[0]) %></label>
							<% if (fieldCombo.split(':')[1] === 'string') { %>
							<input type="text" name="<%= fieldCombo.split(':')[0] %>" value="{{ flashMessages.get('<%= fieldCombo.split(':')[0] %>', '') }}" required="" type="text" class="block w-full px-2 py-2 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50">
							<% } %>
	           <% if (/integer|decimal|float/i.test(fieldCombo.split(':')[1])) { %>
							<input type="number" name="<%= fieldCombo.split(':')[0] %>" value="{{ flashMessages.get('<%= fieldCombo.split(':')[0] %>', '') }}" required="" type="text" class="block w-full px-2 py-2 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50">
							<% } %>
							@if(flashMessages.has('errors.<%= fieldCombo.split(':')[0] %>'))
							  <p class="text-red-600 text-sm" role="alert">
							    {{ flashMessages.get('errors.<%= fieldCombo.split(':')[0] %>') }}
							  </p>
							@end
						</div>
              <% }) %>
						<div class="relative">
							<button class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease">Add <%= h.inflection.titleize(name) %></button>
						</div>
					</div>
				</div>
			</div>
		</form>		
@end

