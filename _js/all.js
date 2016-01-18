(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		controller: 'navCtrl',
		template: 'Nothing selected'
	}).when('/music/:artist', {
		controller: 'artistCtrl',
		templateUrl: 'tpl/artist.html'
	}).otherwise({
		template: '404'
	});
});

app.controller('navCtrl', function ($scope) {});

app.controller('artistCtrl', function ($scope, $route, $routeParams, $http) {
	var dataSrc = './data',
	    artist = $routeParams.artist;

	var data = dataSrc + '/' + artist + '.json';

	var renderArtist = function renderArtist(data) {
		$scope.msg = data.data[0].name + ' from ' + data.data[0].country;
		$scope.albums = data.data[0].albums;
		$scope.loaded = true;
	};

	var fail = function fail(err) {
		console.log(err);
	};

	$http.get(data).then(renderArtist, fail);
});

},{}]},{},[1]);
