(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app', []);

// Helper class
//——————————————————————————————————————————————————

var HelpersService = function () {
	function HelpersService() {
		_classCallCheck(this, HelpersService);

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

	_createClass(HelpersService, [{
		key: 'getScroll',

		// Scroll
		//——————————————————————————————————————————————————
		value: function getScroll() {
			return window.pageYOffset;
		}
	}, {
		key: 'checkVisibility',
		value: function checkVisibility(el) {
			var element = document.querySelector(el);
			var fromTop = element.getBoundingClientRect().top;

			if (fromTop > 0) {
				return false;
			} else {
				return true;
			}
		}

		// Loader
		//——————————————————————————————————————————————————

	}, {
		key: 'createLoader',
		value: function createLoader() {
			var body = document.getElementsByTagName('body')[0];
			body.insertAdjacentHTML('beforeend', '<div id="' + this.loaderID + '" class="' + this.loaderID + '"></div>');
			this.loader = document.getElementById(this.loaderID);
		}
	}, {
		key: 'startLoading',
		value: function startLoading() {
			this.loader.className += ' ' + this.loadingClass;
		}
	}, {
		key: 'title',
		set: function set(title) {
			this._title = title;
		},
		get: function get() {
			console.log(this._title);
			return this._title;
		}
	}]);

	return HelpersService;
}();

app.service('helpers', HelpersService);

// Page component
//——————————————————————————————————————————————————

var PageController = function PageController($helpers, $element, $attrs) {
	_classCallCheck(this, PageController);

	this.$scope = $scope;

	window.addEventListener('scroll', function () {
		var visible = $helpers.checkVisibility('#' + $attrs.id);
		var title = $attrs.title;

		if (visible === true) {
			$helpers.title = title;
		}
	});
};

app.component('page', {
	controller: PageController
});

PageController.$inject = ['helpers', '$element', '$attrs'];

// Header component
//——————————————————————————————————————————————————

var HeaderController = function () {
	function HeaderController($helpers) {
		_classCallCheck(this, HeaderController);

		this.helpers = $helpers;
		this.title = $helpers.title;

		this.getTitle();
	}

	_createClass(HeaderController, [{
		key: 'getTitle',
		value: function getTitle() {
			var _this = this;

			window.addEventListener('scroll', function () {
				_this.title = _this.helpers.title;
			});
		}
	}]);

	return HeaderController;
}();

app.component('header', {
	controller: HeaderController,
	template: '<h1>{{ $ctrl.title; }}</h1>'
});

HeaderController.$inject = ['helpers'];

},{}]},{},[1]);
