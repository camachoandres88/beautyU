var config                  = require('../config');
var passport                = require('passport');
var GoogleStrategy          = require('passport-google').Strategy;
var TwitterStrategy         = require('passport-twitter').Strategy;
var FacebookStrategy        = require('passport-facebook').Strategy;
var User                    = mongoose.model('User');
var mongoose 				= require( 'mongoose' );


passport.serializeUser(function(user, done) {
        done(null, user);
    });

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID        : config.get('googleAuth:clientID'),
    clientSecret    : config.get('googleAuth:clientSecret'),
    callbackURL     : config.get('googleAuth:callbackURL'),
},
function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        User.findOne({ provider_id : profile.id }, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);

            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                provider_token: token,
                provider_refresh_token : refreshToken,
                email : profile.emails[0].value,
                name: profile.displayName,
                photo: profile.image.url
            });
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    });
}));


passport.use(new TwitterStrategy({
    consumerKey:  config.get('twitterAuth:consumerKey'),
    consumerSecret:  config.get('twitterAuth:consumerSecret'),
    callbackURL:  config.get('twitterAuth:callbackURL') 
}, 
function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        User.findOne({provider_id: profile.id}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);

            var user = new User({
                provider_id: profile.id,
                provider:  profile.provider,
                provider_token: token,
                provider_refresh_token : refreshToken,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
         });
    });
}));


passport.use(new FacebookStrategy({
    clientID: config.get('facebookAuth:clientID'),
    clientSecret: config.get('facebookAuth:clientSecret'),
    callbackURL: config.get('facebookAuth:callbackURL')
}, 
function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        User.findOne({provider_id: profile.id}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);

            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                provider_token: token,
                provider_refresh_token : refreshToken,
                email : profile.emails[0].value,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    });
}));