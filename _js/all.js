(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app', ['ngRoute']);

var ArtistController = function () {
	function ArtistController($route, $routeParams, $http) {
		_classCallCheck(this, ArtistController);

		var dataSrc = './data',
		    artist = $routeParams.artist,
		    data = dataSrc + '/' + artist + '.json';

		this.data = data;

		$http.get(data).then(this.renderArtist.bind(this), this.fail.bind(this));
	}

	_createClass(ArtistController, [{
		key: 'renderArtist',
		value: function renderArtist() {
			console.log(this.data);
		}
	}, {
		key: 'fail',
		value: function fail(err) {
			console.log(err);
		}
	}]);

	return ArtistController;
}();

ArtistController.$inject = ['$route', '$routeParams', '$http'];

app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		template: 'Nothing selected'
	}).when('/music/:artist', {
		controller: ArtistController,
		templateUrl: 'tpl/artist.html'
	}).otherwise({
		template: '404'
	});
});

},{}]},{},[1]);
