var router = require('express').Router();
var passport = require('passport');


// login auth route
router.get('/login', (req, res) => {
	res.render('login', {user: req.user});
});

// logout auth route
router.get('/logout', (req, res) => {
	req.logout();
  	res.redirect('/');
});

 

// GOOGLE
// google auth route
router.get('/google', passport.authenticate('google', {
	// what we want to retrieve from the user
	scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/researcher');
});


// GITHUB
// github auth route
router.get('/github', passport.authenticate('github', {
	// what we want to retrieve from the user
	scope: ['profile']
}));

// callback route for github to redirect to
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
	res.redirect('/physician');
});


// LINKEDIN
// linkedin auth route
router.get('/linkedin', passport.authenticate('linkedin', { state: 'DCEEFWF45453sdffef424' }), (req, res) => {
	// what we want to retrieve from the user
	scope: ['profile']
});

// callback route for linkedin to redirect to
router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
	res.redirect('/patient');
});


module.exports = router;