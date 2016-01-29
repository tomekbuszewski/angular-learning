const app = angular.module('app', []);

// Page
//——————————————————————————————————————————————————
class Page {
	constructor($scope) {
		this.sections = new Set();
		this.title;
		this.id;

		this.links = new Map();
		this.map;

		const triggerTitle = () => {
			this.setTitle();
			$scope.$apply();
		};

		window.addEventListener('scroll', triggerTitle);
		$scope.$on('$destroy', () => window.removeEventListener('scroll', triggerTitle));
	}

	register(section) {
		this.sections.add(section);
		this.setTitle();
		this.generateNavigation();
	}

	unregister(section) {
		this.sections.delete(section);
		this.setTitle();
		this.generateNavigation();
	}

	setTitle() {
		this.title = '';
		this.id = '';
		for(let section of this.sections.values()) {
			if (section.isVisible()) {
				this.title = section.title;
				this.id = section.id;
				return;
			}
		}
	}

	generateNavigation() {
		for(let section of this.sections) {
			this.links.set(section.title, '#'+section.id);
		}

		this.map = Array.from(this.links);
	}
}

Page.$inject = ['$scope'];

app.directive('page', () => {
	return {
		controller: Page,
		controllerAs: '$ctrl',
		transclude: true,
		templateUrl: '_templates/page.html'
	};
});

// Page section
//——————————————————————————————————————————————————
class PageSection {
	constructor(el) {
		this.el = el;
	}

	isVisible() {
		const fromTop = this.el[0].getBoundingClientRect().top;

		if((fromTop + window.innerHeight) >= 1) {
			return true;
		} else {
			return false;
		}
	}
}

PageSection.$inject = ['$element'];

app.directive('pageSection', ()=> {
	return {
		controller: PageSection,
		scope: true,
		bindToController: {
			title: '@',
			id: '@'
		},
		controllerAs: '$ctrl',
		require: ['pageSection', '^page'],
		link(scope, el, attrs, [ctrl, page]) {
			page.register(ctrl);

			scope.$on('$destroy', ()=> {
				page.unregister(ctrl);
			});
		}
	};
});

// Page navigation
//——————————————————————————————————————————————————
class PageNavigationController {
	constructor() {
		this.links = new Map();
		this.active;

		this.map;
	}

	createMap(elems) {
		for(let section of elems) {
			this.links.set(section.title, '#'+section.id);
		}

		this.map = Array.from(this.links);
	}

	getActive() {
		return this.active;
	}
}

PageNavigationController.$inject = ['$scope'];

app.directive('pageNavigation', () => {
	return {
		controller: PageNavigationController,
		controllerAs: '$ctrl',
		require: ['pageNavigation', '^page'],
		templateUrl: '../_templates/pageNavigation.html',
		link(scope, el, attrs, [ctrl, page]) {
			const sections = page.sections;

			window.addEventListener('scroll', () => {
				ctrl.active = page.id;
				ctrl.getActive();
			});

			ctrl.createMap(sections);
		}
	};
});

// Page scrolling
//——————————————————————————————————————————————————
app.directive('pageScrollTo', () => {
	return {
		link(scope, el, attrs) {
			const scroll = attrs.pageScrollTo;
			const scrollTarget = document.querySelector(scroll).offsetTop;

			el[0].addEventListener('click', () => { window.scrollTo(0, scrollTarget); });
		}
	};
});
