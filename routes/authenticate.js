var express = require('express');
var router = express.Router();
var passport=require('passport');
require('.././localAuth');
module.exports = function(){
console.log("in authenticate");
	//sends successful login state back to angular


	router.get('/success', function(req, res){

		// res.send("success");
		res.send({state: 'success', user: req.user ? req.user : null});
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	//log in
	router.post('/login',
	passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//log out
	router.get('/signout', function(req, res) {
		req.logout();
		res.send({state:'logout',message:"Logged Out Successfully"});
	});

	return router;

}
