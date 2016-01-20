(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app', ['ngRoute']);

// Progress bar
//---------------------------------------------------

var ProgressBarController = function () {
	function ProgressBarController($scope, $element, $timeout) {
		_classCallCheck(this, ProgressBarController);

		this.scope = $scope;
		this.element = $element;
		this.timeout = $timeout;

		this.element.addClass('progress-bar');
	}

	_createClass(ProgressBarController, [{
		key: 'startProgress',
		value: function startProgress() {
			console.log('start');
			this.element.addClass('-loading');
		}
	}, {
		key: 'finishProgress',
		value: function finishProgress() {
			var _this = this;

			console.log('fin');
			this.element.addClass('-loaded');
			this.timeout(function () {
				_this.element.removeClass('-loaded -loading');
			}, 750);
		}
	}]);

	return ProgressBarController;
}();

ProgressBarController.$inject = ['$scope', '$element', '$timeout'];

app.directive('progressBar', function () {
	return {
		restrict: 'E',
		controller: ProgressBarController,
		controllerAs: 'Progress'
	};
});

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
			var _this2 = this;

			this.http.get(url).then(function (response) {
				return _this2.renderArtist(response);
			}, this.fail);
		}
	}, {
		key: 'renderArtist',
		value: function renderArtist(response) {
			var result = angular.fromJson(response.data);
			this.scope.msg = result;
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

},{}]},{},[1]);
