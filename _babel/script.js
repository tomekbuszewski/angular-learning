const app = angular.module('app', ['ngRoute']);

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
		const result = response.data[0];
		this.scope.msg = result.name;
		this.scope.albums = result.albums;
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

class ScrollController {
	report() {
		console.log(window.scrollY);
	}
}

app.directive('dummy', ($window) => {
	return {
		controller: ScrollController,
		controllerAs: 'ctrl',
    bindToController: true,
		link: (scope, e, a, ctrl) => {
			angular.element($window).on('scroll', () => {
				ctrl.report();
			});
		}
	};
});
