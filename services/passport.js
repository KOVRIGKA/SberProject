const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); 

passport.serializeUser((user, done) => {
    done(null, user.id);
});
 
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done ) => {
            // промисы
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        // we already have record with the given profile ID 
                        done(null, existingUser);
                    } else {
                        // we don't have a user record with this ID, nake a new record! 
                        new User({ googleId: profile.id })
                            .save()
                            .then( user => done(null, user));
                    }
                })
        }
    )
);  