var config                  = require('../config');
var passport                = require('passport');
var GoogleTokenStrategy     = require('passport-google-token');
var FacebookTokenStrategy   = require('passport-facebook-token');
var TwitterTokenStrategy    = require('passport-twitter-token');
var User                    = mongoose.model('User');
var mongoose 				= require( 'mongoose' );
var passport                = require('passport');

passport.serializeUser(function(user, done) {
        done(null, user);
    });

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use(new TwitterTokenStrategy({
        consumerKey:  config.get('twitterAuth:consumerKey'),
        consumerSecret:  config.get('twitterAuth:consumerSecret'),
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
    }
));


passport.use(new GoogleTokenStrategy({
        clientID        : config.get('googleAuth:clientID'),
        clientSecret    : config.get('googleAuth:clientSecret'),
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
    }
));


passport.use(new FacebookTokenStrategy({
        clientID: config.get('facebookAuth:clientID'),
        clientSecret: config.get('facebookAuth:clientSecret'),
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
    }
));
