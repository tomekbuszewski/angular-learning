const app = angular.module('app', ['ngRoute']);

// Progress bar
//---------------------------------------------------
class ProgressBarController {
	constructor($scope, $element, $timeout) {
		this.scope = $scope;
		this.element = $element;
		this.timeout = $timeout;

		this.element.addClass('progress-bar');
	}

	startProgress() {
		console.log('start');
		this.element.addClass('-loading');
	}

	finishProgress() {
		console.log('fin');
		this.element.addClass('-loaded');
		this.timeout(() => {
			this.element.removeClass('-loaded -loading');
		}, 750);
	}
}

ProgressBarController.$inject = ['$scope', '$element', '$timeout'];

app.directive('progressBar', () => {
	return {
		restrict: 'E',
		controller: ProgressBarController,
		controllerAs: 'Progress'
	};
});


// Artists
//---------------------------------------------------
class ArtistController {
	constructor($scope, $route, $routeParams, $http) {
		const dataSrc = './data',
			artist = $routeParams.artist,
			url = dataSrc+'/'+artist+'.json';

		this.scope = $scope;
		this.route = $routeParams;
		this.http = $http;

		this.fetchUrl(url);
	}

	fetchUrl(url) {
		this.http.get(url).then((response) => this.renderArtist(response), this.fail);
	}

	renderArtist(response) {
		const result = angular.fromJson(response.data);
		this.scope.msg = result;
	}

	fail(err) {
		console.log(err);
	}
}

ArtistController.$inject = ['$scope', '$route', '$routeParams', '$http'];

app.config(($routeProvider) => {
	$routeProvider
		.when('/', {
			template: 'Nothing selected'
		})
		.when('/music/:artist', {
			controller: ArtistController,
			templateUrl: 'tpl/artist.html'
		})
		.otherwise({
			template: '404'
		});
});
