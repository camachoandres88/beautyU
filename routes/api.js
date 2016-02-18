var express 				= require('express');
var router 					= express.Router();
var mongoose 				= require( 'mongoose' );
var ClientModel 			= mongoose.model('Client');
var log						= require('../libs/log')(module);
var passport                = require('passport');


router.get('/auth/google/token', passport.authenticate('google-token'),
	function (req, res) {
		res.send(req.user);
	}
);

router.get('/auth/twitter/token',passport.authenticate('facebook-token'),
	function (req, res) {
		res.send(req.user);
	}
);

router.get('/auth/facebook/token',passport.authenticate('twitter-token'),
	function (req, res) {
		res.send(req.user);
	}
);

router.post('/client',function (req, res) {
	if(req.body.name && req.body.clientId && req.body.clientSecret ){
		var client = new ClientModel({ name: req.body.name, clientId: req.body.clientId, clientSecret: req.body.clientSecret});
	    client.save(function(err, client) {
	         if(err){
	        	log.error(err);
	        	return res.send({message:err.errmsg});
	        } 
	        else{
	        	res.send({ name: req.body.name, clientId: req.body.clientId, clientSecret: req.body.clientSecret});
	        } 
	    });	
	}else{
		res.send({message:'Username and Password are required.'});
	}
});

module.exports = router;
