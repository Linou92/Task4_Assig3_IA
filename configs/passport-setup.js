var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
var keys = require('./keys');
var User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// GOOGLE
passport.use(
	new GoogleStrategy({
		//options for the google strategy
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret,
		callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
		User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){
        console.log('google user is: ', currentUser);
        done(null, currentUser);
      }
      else{
        new User({
          googleId: profile.id,
          username: profile.displayName
        }).save().then((newUser) => {
          console.log('created new google user: ', newUser);
          done(null, newUser);
        });
      }
    });
})); 


// GITHUB
passport.use(
  new GitHubStrategy({
    //options for the github strategy
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: '/auth/github/redirect'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({githubId: profile.id}).then((currentUser) => {
      if(currentUser){
        console.log('github user is: ', currentUser);
        done(null, currentUser);
      }
      else{
        new User({
          githubId: profile.id,
          username: profile.displayName
        }).save().then((newUser) => {
          console.log('created new github user: ', newUser);
          done(null, newUser);
        });
      }
    });
})); 


// LINKEDIN
passport.use(
  new LinkedinStrategy({
    //options for the linkedin strategy
    clientID: keys.linkedin.clientID,
    clientSecret: keys.linkedin.clientSecret,
    callbackURL: '/auth/linkedin/redirect',
    scope: ['r_emailaddress', 'r_basicprofile']
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({linkedinId: profile.id}).then((currentUser) => {
      if(currentUser){
        console.log('linkedin user is: ', currentUser);
        done(null, currentUser);
      }
      else{
        new User({
          linkedinId: profile.id,
          username: profile.displayName
        }).save().then((newUser) => {
          console.log('created new linkedin user: ', newUser);
          done(null, newUser);
        });
      }
    });
})); 

