const app = angular.module('app', ['ngRoute']);

app.config(($routeProvider) => {
	$routeProvider
		.when('/', {
			controller: 'navCtrl',
			template: 'Nothing selected'
		})
		.when('/music/:artist', {
			controller: 'artistCtrl',
			templateUrl: 'tpl/artist.html'
		})
		.otherwise({
			template: '404'
		});
});

app.controller('navCtrl', ($scope) => {
	$scope.progress = 'no progress';
});

app.controller('artistCtrl', ($scope, $route, $routeParams, $http) => {
	let dataSrc = './data',
		artist = $routeParams.artist;

	let data = dataSrc+'/'+artist+'.json';

	var renderArtist = function(data) {
		$scope.msg = data.data[0].name+' from '+data.data[0].country;
		$scope.albums = data.data[0].albums;
		$scope.loaded = true;
		$scope.progress = 'bam';
	};

	var fail = function(err) {
		console.log(err);
	};

	$http.get(data).then(renderArtist, fail);
});

app.directive('progressBar', () => {
	return {
		scope: {},
		link: (scope, element) => {
			scope.$watch('progress', () => {
				element.text(scope.progress);
				console.log(scope.$parent);
			});
		}
	};
});
