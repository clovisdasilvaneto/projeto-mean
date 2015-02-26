var mongoose = require('mongoose');

module.exports = function(){
	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		emergencia: {
			type: mongoose.Schema.ObjectId,
			ref: 'ContatoModel'
		}
	})

	return mongoose.model('ContatoModel',schema);
}