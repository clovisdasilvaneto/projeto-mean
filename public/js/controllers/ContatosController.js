angular.module('contato').controller('contatosController',function($resource,$scope,Contato){
	
	var busca = (function(){
		//tratamento de erros
		function privateErr(msg,err){
			$scope.mensagem = {texto: msg}
			console.log(err);
		};
		
		//lista os contatos
		function publicListarContato(){
			Contato.query(function(contatos){
				$scope.mensagem = {}
				return $scope.contatos = contatos;
			},function(err){
				return privateErr("Não foi possível obter a lista de contatos",err)
			})
		};

		//remove o contato
		function publicRemoverContato(contato){
			Contato.delete({id: contato._id}, publicListarContato, function(err){
				return privateErr("Não foi possível remover o contato", err)
			});
		}

		return {
		//responsável por
			//listar os contatos
			query: publicListarContato,
			//deletar um contato específico
			delete: publicRemoverContato
		};
	})();
	

	$scope.remove = function(contato){
		busca.delete(contato);
	};

	busca.query();
});