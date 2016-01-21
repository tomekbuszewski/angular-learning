(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app', ['ngRoute']);

// Artists
//---------------------------------------------------

var ArtistController = function () {
	function ArtistController($scope, $route, $routeParams, $http) {
		_classCallCheck(this, ArtistController);

		var dataSrc = './data',
		    artist = $routeParams.artist,
		    url = dataSrc + '/' + artist + '.json';

		this.scope = $scope;
		this.route = $routeParams;
		this.http = $http;

		this.fetchUrl(url);
	}

	_createClass(ArtistController, [{
		key: 'fetchUrl',
		value: function fetchUrl(url) {
			var _this = this;

			this.http.get(url).then(function (response) {
				return _this.renderArtist(response);
			}, this.fail);
		}
	}, {
		key: 'renderArtist',
		value: function renderArtist(response) {
			var result = response.data[0];
			this.scope.msg = result.name;
			this.scope.albums = result.albums;
		}
	}, {
		key: 'fail',
		value: function fail(err) {
			console.log(err);
		}
	}]);

	return ArtistController;
}();

ArtistController.$inject = ['$scope', '$route', '$routeParams', '$http'];

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

var ScrollController = function () {
	function ScrollController() {
		_classCallCheck(this, ScrollController);
	}

	_createClass(ScrollController, [{
		key: 'report',
		value: function report() {
			console.log(window.scrollY);
		}
	}]);

	return ScrollController;
}();

app.directive('dummy', function ($window) {
	return {
		controller: ScrollController,
		controllerAs: 'ctrl',
		bindToController: true,
		link: function link(scope, e, a, ctrl) {
			angular.element($window).on('scroll', function () {
				ctrl.report();
			});
		}
	};
});

},{}]},{},[1]);
