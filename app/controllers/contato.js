module.exports = function(app) { 
	var Contato = app.models.contato;
	var controller = {}; 

	
	controller.listaContatos = function(req, res) { 
		Contato.find().populate('emergencia').exec().then(function(contatos){
			res.json(contatos);
		},function(erro){
			console.log(erro);
			res.status(500).json(erro);
		})
	};

	controller.salvaContato = function(req,res){
		var _id = req.body._id;
		//verifica se existe um contato de emergencia associado
		req.body.emergencia = req.body.emergencia || null;

		if(_id){
			Contato.findByIdAndUpdate(_id, req.body).exec().then(
				function (contato){
					res.json(contato);
				},
				function (erro){
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		}else {
			Contato.create(req.body).then(
				function(contato){
					res.status(201).json(contato)
				},
				function(erro){
					console.log("erro! "+erro);
					res.status(500).json(erro)
				}
			);

			// Outra maneira de salvar no banco
			//
			// var contato = new Contato(req.body);
			// contato.save(function(erro,contato){
			// 	if(erro){
			// 		res.status(500).end();
			// 		console.log(erro);
			// 	}else {
			// 		res.json(contato)
			// 	}
			// })
		}
	}

	controller.obtemContatos = function(req,res){
		var _id = req.params.id;
		Contato.findById(_id).exec().then(
			function (contato){
				if(!contato) throw new Error("Contato não encontrado!");
				res.json(contato);
			},function(erro){
				console.log(erro);
				res.status(404).json(erro);
			}
		);
	};

	controller.removeContato = function(req,res){
		var _id = req.params.id;
		Contato.remove({"_id":_id}).exec().then(
			function(){
				res.end();
			},function(erro){
				return console.error(erro);
			}
		);
	};

	return controller; 
}