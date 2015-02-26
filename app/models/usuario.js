var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function(){
	var schema = mongoose.Schema({
		login: { 
			type: String, 
			required: true, 

			index: { unique: true } 
		},

		nome: {
			type: String, 
			required: true, 
		},

		includesao: {
			type: Date,
			default: Date.now
		}
	})

	schema.plugin(findOrCreate);

	return mongoose.model('Usuario',schema)
}