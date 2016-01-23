const app = angular.module('app', []);

// Loader class
//——————————————————————————————————————————————————
class LoaderService {
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

app.service('loader', LoaderService);

// Scroll class
//——————————————————————————————————————————————————
class ScrollService {
	constructor() {
		this.scrollTop = () => { return window.pageYOffset; }
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
}

app.service('scroll', ScrollService);

// Page component
//——————————————————————————————————————————————————
class PageController {
	constructor($scroll, $element, $attrs) {

		window.addEventListener('scroll', () => {
			let visible = $scroll.checkVisibility('#'+$attrs.id);
			if(visible === true) { console.log($attrs.title); }
		});
	}
}


app.component('page', {
	controller: PageController
});

PageController.$inject = ['scroll', '$element', '$attrs'];
