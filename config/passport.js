var passport = require('passport'),
GitHubStrategy = require('passport-github').Strategy,
findOrCreate = require('mongoose-findorcreate'),
mongoose = require('mongoose');

module.exports = function(){
	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID: '8356a2785729049856db',
		clientSecret: '6f839a2c88b00fe0f1ca9fa550cbfbda5f7da43b',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}), function(accessToken, refreshToken, profile, done){
		Usuario.findOrCreate(
			{"login":profile.username},
			{"nome":profile.username},
			function(erro,usuario){
				if(erro){
					console.log(erro);
					return done(erro)
				}

				return done(null,usuario);
			}
		)
	})

	//serializa o usuario
	passport.serializeUser(function(usuario,done){
		done(null, usuario._id);
	});

	//deserializa o usuario
	//torna disponivel o req.user em qualquer controller
	passport.deserializeUser(function(id,done){
		Usuario.findById(id).exec().then(function(usuario){
			done(null,usuario);
		});
	})
}