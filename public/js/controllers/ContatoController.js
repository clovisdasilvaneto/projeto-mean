angular.module('contato')
	.controller('contatoController', function($scope,$routeParams,$resource,Contato){
		if($routeParams.contatoId){
			Contato.get({id: $routeParams.contatoId},function(data){
				$scope.contato = data;
			},function(error){
				$scope.mensagem = {texto:"erro ao obter o contato"};
				console.log(error);
			});
		}else{
			$scope.contato = new Contato();			
		}

		$scope.salvar = function(){
			$scope.contato.$save().then(function(){
				$scope.mensagem = {texto:'Salvo com sucesso'}
			}).catch(function(){
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
		}

		Contato.query(function(contatos){
			$scope.contatos = contatos;
		})

	});