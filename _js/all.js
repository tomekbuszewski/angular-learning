(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app', []);

// Page
//——————————————————————————————————————————————————

var Page = function () {
	function Page($scope) {
		var _this = this;

		_classCallCheck(this, Page);

		this.sections = new Set();
		this.title;
		this.id;

		var cb = function cb() {
			_this.setTitle();
			$scope.$apply();
		};

		window.addEventListener('scroll', cb);
		$scope.$on('$destroy', function () {
			return window.removeEventListener('scroll', cb);
		});
	}

	_createClass(Page, [{
		key: 'register',
		value: function register(section) {
			this.sections.add(section);
			this.setTitle();
		}
	}, {
		key: 'unregister',
		value: function unregister(section) {
			this.sections.delete(section);
			this.setTitle();
		}
	}, {
		key: 'setTitle',
		value: function setTitle() {
			this.title = '';
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.sections.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var s = _step.value;

					if (s.isVisible()) {
						this.title = s.title;
						this.id = s.id;
						return;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}]);

	return Page;
}();

Page.$inject = ['$scope'];

app.directive('page', function () {
	return {
		controller: Page,
		controllerAs: '$ctrl',
		transclude: true,
		template: '\n\t\t\t<header class="page-header">{{ $ctrl.title }}</header>\n\t\t\t<div class="content" ng-transclude></div>\n\t\t'
	};
});

// Page section
//——————————————————————————————————————————————————

var PageSection = function () {
	function PageSection(el) {
		_classCallCheck(this, PageSection);

		this.el = el;
	}

	_createClass(PageSection, [{
		key: 'isVisible',
		value: function isVisible() {
			var fromTop = this.el[0].getBoundingClientRect().top;

			if (fromTop + window.innerHeight >= 1) {
				return true;
			} else {
				return false;
			}
		}
	}]);

	return PageSection;
}();

PageSection.$inject = ['$element'];

app.directive('pageSection', function () {
	return {
		controller: PageSection,
		scope: true,
		bindToController: {
			title: '@',
			id: '@'
		},
		controllerAs: '$ctrl',
		require: ['pageSection', '^page'],
		link: function link(scope, el, attrs, _ref) {
			var _ref2 = _slicedToArray(_ref, 2);

			var ctrl = _ref2[0];
			var page = _ref2[1];

			page.register(ctrl);

			scope.$on('$destroy', function () {
				page.unregister(ctrl);
			});
		}
	};
});

// Page navigation
//——————————————————————————————————————————————————

var PageNavigationController = function () {
	function PageNavigationController() {
		_classCallCheck(this, PageNavigationController);

		this.links = new Map();
		this.active;

		this.map;
	}

	_createClass(PageNavigationController, [{
		key: 'createMap',
		value: function createMap(elems) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = elems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var section = _step2.value;

					this.links.set(section.title, '#' + section.id);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.map = Array.from(this.links);
			console.log(this.map);
		}
	}]);

	return PageNavigationController;
}();

PageNavigationController.$inject = ['$scope'];

app.directive('pageNavigation', function () {
	return {
		controller: PageNavigationController,
		controllerAs: '$ctrl',
		require: ['pageNavigation', '^page'],
		templateUrl: '../_templates/pageNavigation.html',
		link: function link(scope, el, attrs, _ref3) {
			var _ref4 = _slicedToArray(_ref3, 2);

			var ctrl = _ref4[0];
			var page = _ref4[1];

			var sections = page.sections;

			ctrl.createMap(sections);
		}
	};
});

// Page scrolling
//——————————————————————————————————————————————————
app.directive('pageScrollTo', function () {
	return {
		link: function link(scope, el, attrs) {
			var scroll = attrs.pageScrollTo;
			var scrollTarget = document.querySelector(scroll).offsetTop;

			el[0].addEventListener('click', function () {
				window.scrollTo(0, scrollTarget);
			});
		}
	};
});

},{}],2:[function(require,module,exports){
'use strict';

require('./page');

},{"./page":1}]},{},[2]);
