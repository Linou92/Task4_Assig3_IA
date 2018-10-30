var router = require('express').Router();
var userdetails = require('mongoose').model('userdetail');
var authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/auth/login');
	}
	else{
		userdetails.findOne({username:req.user.userid})
	   .then(result=>{
		   req._passport.session.loggedInDetails = result;
		next();

	   })
	   .catch(err=>{
		res.redirect('/auth/login');
	   })
		
	}
};

router.get('/', authCheck, (req, res) => {
	req._passport.session.role='Researcher';
	res.render('researcher', {user: req._passport.session.loggedInDetails});
});

module.exports = router;