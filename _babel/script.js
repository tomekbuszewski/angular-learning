const app = angular.module('app', []);

app.component('shadow', {
	bindings: {
		colour: '@'
	},
	controller: function() {
			this.setColour = setColour;

			function setColour(colour) {
					this.colour = colour;
			}
	},
	template: ['<div ',
		'style="background: {{ $ctrl.colour }}; width: 100px; height: 100px;">',
		'<button ng-click="$ctrl.setColour(\'red\');">Button</button>',
	'</div>'].join('')
});
