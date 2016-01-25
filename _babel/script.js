const app = angular.module('app', []);

// Helper class
//——————————————————————————————————————————————————
class HelpersService {
	constructor() {
		// Title
		//——————————————————————————————————————————————————
		this.title = '';

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
	setTitle(title) {
		this.title = title;
	}

	getTitle() {
		return this.title;
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
		window.addEventListener('scroll', () => {
			let visible = $helpers.checkVisibility('#'+$attrs.id);
			let title = $attrs.title;

			if(visible === true) {
				$helpers.setTitle(title);
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
		this.title = $helpers.getTitle();

		this.getTitle();
	}

	getTitle() {
		window.addEventListener('scroll', () => {
			this.helpers.getTitle();
			this.title = this.helpers.getTitle();
		});
	}
}

app.component('header', {
	controller: HeaderController,
	template: '<h1>{{ $ctrl.title; }}</h1>'
});

HeaderController.$inject = ['helpers'];
