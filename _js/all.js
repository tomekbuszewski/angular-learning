(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app', []);

var Loader = function () {
	function Loader() {
		_classCallCheck(this, Loader);

		this.loaderID = 'progress-bar';
		this.loader = document.getElementById(this.loaderID);

		this.loadingClass = '-loading';
		this.loadedClass = '-loaded';

		this.createLoader();
	}

	_createClass(Loader, [{
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

	return Loader;
}();

app.service('loader', Loader);

var ShadowController = function () {
	function ShadowController($loader) {
		_classCallCheck(this, ShadowController);

		// this.setColour = setColour;
		this.loader = $loader;
	}

	_createClass(ShadowController, [{
		key: 'setColour',
		value: function setColour(colour) {
			this.colour = colour;
			this.loader.startLoading();
		}
	}]);

	return ShadowController;
}();

ShadowController.$inject = ['loader'];

app.component('shadow', {
	bindings: {
		colour: '@'
	},
	controller: ShadowController,
	template: ['<div ', 'style="background: {{ $ctrl.colour }}; width: 100px; height: 100px;">', '<button ng-click="$ctrl.setColour(\'red\');">Button</button>', '<button ng-click="noise.music()">Noise</button>', '</div>'].join('')
});

app.component('noise', {
	bindings: {
		name: '='
	},
	controllerAs: 'noise',
	controller: function controller() {
		this.name = 'Noise';
		this.music = music;

		function music() {
			alert('Merzbow');
		}
	},
	template: ['<div>{{ noise.name }}</div>'].join('')
});

},{}]},{},[1]);
