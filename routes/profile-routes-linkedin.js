var router = require('express').Router();

var authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/auth/login');
	}
	else{
		next();
	}
};

router.get('/', authCheck, (req, res) => {
	res.render('patient', {user: req.user});
});

module.exports = router;