const app = angular.module('app', ['ngRoute']);

class ArtistController {
	constructor($route, $routeParams, $http) {
		let dataSrc = './data',
			artist = $routeParams.artist,
			data = dataSrc+'/'+artist+'.json';

		this.data = data;

		$http.get(data).then(this.renderArtist, this.fail);
	}

	renderArtist() {
		console.log(this.data);
	}

	fail(err) {
		console.log(err);
	}
}

ArtistController.$inject = ['$route', '$routeParams', '$http'];

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
