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
		<header style="position: fixed; top: 0; left: 0; background: yellow">{{ $ctrl.title }}</header>
		<div class="content" ng-transclude></div>
	`
});


class PageSection {
	constructor(el) {
		this.el = el;
	}

	isVisible() {
		const fromTop = this.el[0].getBoundingClientRect().top;

		console.log(this.title, fromTop);
		if(fromTop >= 0 && fromTop < window.innerHeight) {
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
			title: '@'
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
