(function(){
	'use strict';
	
	var ENTER_KEY = 13;
	
	var util = {
		store: function(namespace, data) {
			if (arguments.length > 1) {
				localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
		}
	};
	
	var App = {
		init: function() {
			this.todos = util.store('todos-vanillaJS');
			var source = document.getElementById("todo-template").innerHTML;
			this.todoTemplate = Handlebars.compile(source);
			this.bindEvents();
		},
		bindEvents: function() {
			var newTodo = document.getElementById("newtodo");
		
			newTodo.addEventListener("keyup", this.create.bind(this));
			
		},
		create: function(e) {
			var input = e.target;
			var val = input.value.trim();
			
			if (e.which !== ENTER_KEY || !val) {
				return;
			} 
			
			this.todos.push({
				title: val,
				completed: false
			});
			
			input.value = "";
			this.render();
			this.store();
		},
		render: function() {
			var todolistul = document.getElementById("todo-list");
			todolistul.innerHTML = this.todoTemplate(this.todos);
			
		}, 
		store: function() {
			util.store('todos-vanillaJS', this.todos);	
		}
		
	};
	
	App.init();
	
})();