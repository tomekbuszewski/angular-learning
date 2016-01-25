const app = angular.module('app', []);

// Helper class
//——————————————————————————————————————————————————
class HelpersService {
	constructor() {
		// Title
		//——————————————————————————————————————————————————
		this._title = '';

		// Loader
		//——————————————————————————————————————————————————
		this.loaderID = 'progress-bar';
		this.loader = document.getElementById(this.loaderID);

		this.loadingClass = '-loading';
		this.loadedClass = '-loaded';

		this.createLoader();
	}

	// Title
	//——————————————————————————————————————————————————
	set title(title) {
		this._title = title;
	}

	get title() {
		console.log(this._title);
		return this._title;
	}

	// Scroll
	//——————————————————————————————————————————————————
	getScroll() {
		return window.pageYOffset;
	}

	checkVisibility(el) {
		const element = document.querySelector(el);
		const fromTop = element.getBoundingClientRect().top;

		if(fromTop > 0) {
			return false;
		} else {
			return true;
		}
	}

	// Loader
	//——————————————————————————————————————————————————
	createLoader() {
		const body = document.getElementsByTagName('body')[0];
		body.insertAdjacentHTML('beforeend', `<div id="${this.loaderID}" class="${this.loaderID}"></div>`);
		this.loader = document.getElementById(this.loaderID);
	}

	startLoading() {
		this.loader.className += ` ${this.loadingClass}`;
	}
}

app.service('helpers', HelpersService);

// Page component
//——————————————————————————————————————————————————
class PageController {
	constructor($helpers, $element, $attrs) {
		this.$scope = $scope;

		window.addEventListener('scroll', () => {
			let visible = $helpers.checkVisibility('#'+$attrs.id);
			let title = $attrs.title;

			if(visible === true) {
				$helpers.title = title;
			}
		});
	}
}


app.component('page', {
	controller: PageController
});

PageController.$inject = ['helpers', '$element', '$attrs'];

// Header component
//——————————————————————————————————————————————————
class HeaderController {
	constructor($helpers) {
		this.helpers = $helpers;
		this.title = $helpers.title;

		this.getTitle();
	}

	getTitle() {
		window.addEventListener('scroll', () => {
			this.title = this.helpers.title;
		});
	}
}

app.component('header', {
	controller: HeaderController,
	template: '<h1>{{ $ctrl.title; }}</h1>'
});

HeaderController.$inject = ['helpers'];
