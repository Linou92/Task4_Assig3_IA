var router = require('express').Router();
var keys = require('../configs/keys');
var express = require('express');


var authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/auth/login');
	}
	else{
		next();
	}
};


router.get('/', authCheck, (req, res) => {
	res.sendFile( __dirname + '/data/data1.csv');
});

module.exports = router