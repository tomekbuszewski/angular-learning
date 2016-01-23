const app = angular.module('app', []);

class Loader {
	constructor() {
		this.loaderID = 'progress-bar';
		this.loader = document.getElementById(this.loaderID);

		this.loadingClass = '-loading';
		this.loadedClass = '-loaded';

		this.createLoader();
	}

	createLoader() {
		const body = document.getElementsByTagName('body')[0];
		body.insertAdjacentHTML('beforeend', `<div id="${this.loaderID}" class="${this.loaderID}"></div>`);
		this.loader = document.getElementById(this.loaderID);
	}

	startLoading() {
		this.loader.className += ` ${this.loadingClass}`;
	}
}

app.service('loader', Loader);

class ShadowController {
	constructor($loader) {
		// this.setColour = setColour;
		this.loader = $loader;
	}

	setColour(colour) {
		this.colour = colour;
		this.loader.startLoading();
	}
}

ShadowController.$inject = ['loader'];

app.component('shadow', {
	bindings: {
		colour: '@'
	},
	controller: ShadowController,
	template: ['<div ',
		'style="background: {{ $ctrl.colour }}; width: 100px; height: 100px;">',
		'<button ng-click="$ctrl.setColour(\'red\');">Button</button>',
		'<button ng-click="noise.music()">Noise</button>',
	'</div>'].join('')
});

app.component('noise', {
	bindings: {
		name: '='
	},
	controllerAs: 'noise',
	controller: function() {
		this.name = 'Noise';
		this.music = music;

		function music() {
			alert('Merzbow');
		}
	},
	template: ['<div>{{ noise.name }}</div>'].join('')
});
