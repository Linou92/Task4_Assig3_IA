const PORT = process.env.PORT || 3000;
var express = require('express');
var cookieSession = require('cookie-session');
var passport = require('passport');
var mongodb = require('./mongo')();
var bodyParser = require('body-parser');
// importing routes
var authRoutes = require('./routes/auth-routes');
var passportSetup = require('./configs/passport-setup');
var keys = require('./configs/keys');
var profileRoutesLinkedin = require('./routes/profile-routes-linkedin');
var profileRoutesGoogle = require('./routes/profile-routes-google');
var profileRoutesGithub = require('./routes/profile-routes-github');
var RSSRoutes = require('./routes/rss-routes');
var YoutubeRoutes = require('./routes/youtube-routes');
var ActivityRoutes = require('./routes/activity-routes');
var DataRoutes = require('./routes/data-routes');
var MapRoutes = require('./routes/map-routes');
var mongoose = require('mongoose');
var patientProfileRoutes = require('./routes/patientProfile-routes');
var ActivityRoutes2 = require('./routes/activity2-routes');


var app = express();


// set up view engine
app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
// set up session cookies
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURL, () => {
	console.log('connected to mongodb');
});

// set up routes (middleware)
app.use('/auth', authRoutes);
app.use('/patient', profileRoutesLinkedin);
app.use('/physician', profileRoutesGithub);
app.use('/researcher', profileRoutesGoogle);
app.use('/rss', RSSRoutes);
app.use('/youtube', YoutubeRoutes);
app.use('/activity', ActivityRoutes);
app.use('/data', DataRoutes);
app.use('/map', MapRoutes);
app.use('/patient-profile', patientProfileRoutes);
app.use('/activity2', ActivityRoutes2);

// route for the homepage
app.get('/', (req, res) => {
	res.render('home', {user: req.user});
});


// listen to port nb
app.listen(PORT);
console.log("App server running on port ${PORT}");




