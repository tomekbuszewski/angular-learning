const app = angular.module('app', []);

class Page {
	constructor($scope) {
		this.sections = new Set();

		const cb = ()=> {
			this.setTitle();
			$scope.$apply();
		};

		window.addEventListener('scroll', cb);
		$scope.$on('$destroy', ()=> window.removeEventListener('scroll', cb));
	}

	register(section) {
		this.sections.add(section);
		this.setTitle();
	}

	unregister(section) {
		this.sections.delete(section);
		this.setTitle();
	}

	setTitle() {
		this.title = '';
		for(let s of this.sections.values()) {
			if (s.isVisible()) {
				this.title = s.title;
				return;
			}
		}
	}
}
Page.$inject = ['$scope'];

app.component('page', {
	controller: Page,
	transclude: true,
	template: `
		<header style="position: fixed; top: 0; left: 0; background: yellow; display: block; width: 100%; line-height: 30px;">{{ $ctrl.title }}</header>
		<div class="content" ng-transclude></div>
	`
});


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

class PageNavigationController {
	constructor($element) {
		this.links = new Map();
		this.el = $element;

		this.map = Array.from(this.links);
	}

	getPosition(el) {
		return document.getElementById(el).offsetTop;
	}

	createMap(elems) {
		for(let section of elems) {
			this.links.set(section.title, this.getPosition(section.id));
		}

		this.map = Array.from(this.links);
	}
}

PageNavigationController.$inject = ['$element'];

app.directive('pageNavigation', () => {
	return {
		controller: PageNavigationController,
		controllerAs: '$ctrl',
		require: ['pageNavigation', '^page'],
		template: `
			<li ng-repeat="link in $ctrl.map" page-scroll-to="{{link[1]}}">{{link[0]}}</li>
		`,
		link(scope, el, attrs, [ctrl, page]) {
			const sections = page.sections;

			ctrl.createMap(sections);
		}
	};
});

app.directive('pageScrollTo', () => {
	return {
		link(scope, el, attrs) {
			const scroll = attrs.pageScrollTo;

			el[0].addEventListener('click', () => { window.scrollTo(0, scroll); });
		}
	};
});
