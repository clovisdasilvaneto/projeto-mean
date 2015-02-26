angular.module('contato',['ngRoute','ngResource']).config(function($routeProvider){
	$routeProvider
		.when('/contatos',{
			//lista os contatos
			templateUrl: 'partials/contatos.html',
			controller: "contatosController"
		})
		.when('/contato/:contatoId',{
			//edita um determinado contato
			templateUrl: 'partials/contato.html',
			controller: "contatoController"
		})
		.when('/contato/',{
			//adiciona um determinado contato
			templateUrl: 'partials/contato.html',
			controller: "contatoController"
		})
		.otherwise({redirectTo: '/contatos'});

    $routeProvider.when('/auth', {
      templateUrl: 'partials/auth.html'
    });
});