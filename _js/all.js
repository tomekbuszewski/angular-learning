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

		this.title = { text: '' };
	}

	_createClass(HelpersService, [{
		key: 'setTitle',
		value: function setTitle(title) {
			this.title.text = title;
		}
	}, {
		key: 'getTitle',
		value: function getTitle() {
			return this.title;
		}
	}]);

	return HelpersService;
}();

app.service('helpers', HelpersService);

// Loader class
//——————————————————————————————————————————————————

var LoaderService = function () {
	function LoaderService() {
		_classCallCheck(this, LoaderService);

		this.loaderID = 'progress-bar';
		this.loader = document.getElementById(this.loaderID);

		this.loadingClass = '-loading';
		this.loadedClass = '-loaded';

		this.createLoader();
	}

	_createClass(LoaderService, [{
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
	}]);

	return LoaderService;
}();

app.service('loader', LoaderService);

// Scroll class
//——————————————————————————————————————————————————

var ScrollService = function () {
	function ScrollService() {
		_classCallCheck(this, ScrollService);

		this.scrollTop = function () {
			return window.pageYOffset;
		};
	}

	_createClass(ScrollService, [{
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
	}, {
		key: 'getDirection',
		value: function getDirection() {}
	}]);

	return ScrollService;
}();

app.service('scroll', ScrollService);

// Page component
//——————————————————————————————————————————————————

var PageController = function PageController($scroll, $helpers, $element, $attrs) {
	_classCallCheck(this, PageController);

	window.addEventListener('scroll', function () {
		var visible = $scroll.checkVisibility('#' + $attrs.id);
		var title = $attrs.title;

		if (visible === true) {
			$helpers.setTitle(title);
		}
	});
};

app.component('page', {
	controller: PageController
});

PageController.$inject = ['scroll', 'helpers', '$element', '$attrs'];

// Header component
//——————————————————————————————————————————————————

var HeaderController = function HeaderController($helpers) {
	_classCallCheck(this, HeaderController);

	this.title = { text: $helpers.getTitle().text };
};

app.component('header', {
	controller: HeaderController,
	template: '<h1>{{ $ctrl.title.text }}</h1>'
});

HeaderController.$inject = ['helpers'];

},{}]},{},[1]);
