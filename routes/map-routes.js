var router = require('express').Router();
var userdetails = require('mongoose').model('userdetail');
var authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/auth/login');
	}
	else{
		next();
	}
};

router.get('/:id?', authCheck, (req, res) => {
	var userid = req.params.id;
	if(userid){
	userdetails.findOne({username:userid})
	.then(x=>{
		res.render('map',{user: req.user,latitude:x.latitude,longitude:x.longitude})
	})
	.catch(err=>{
		res.render('/');
	})
}
else{
	res.render('map', {user: req.user,latitude:"",longitude:""})
}
	

	//res.render('map', {user: req.user});
});

module.exports = router;