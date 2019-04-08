const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// const FbStrategy = require('passport-facebook').Strategy;
const keys = require('./credentials');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    }); 
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({oauthId: profile.id}).then((currentUser) => {
            if (currentUser) {
                console.log(profile)
                console.log("Current User: ", currentUser);
                done(null, currentUser);
            }
            else {
                new User({
                    username: profile.displayName,
                    oauthId: profile.id,
                    email: profile.emails[0].value,
                    type: 'google',
                    image: profile._json.image.url+"?sz=500"
                })
                .save()
                .then((newUser) => {
                    console.log(profile)
                    console.log('New User Created: ', newUser)
                    done(null, newUser);
                });
            }
        })
    })
);

passport.use(
    new GitHubStrategy({
        // options for google strategy
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret,
        callbackURL: '/auth/github/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({oauthId: profile.id}).then((currentUser) => {
            if (currentUser) {
                console.log(profile)
                console.log("Current User: ", currentUser);
                done(null, currentUser);
            }
            else {
                new User({
                    username: profile.displayName,
                    oauthId: profile.id,
                    email: profile.emails[0].value,
                    type: 'github',
                    image: profile._json.avatar_url
                })
                .save()
                .then((newUser) => {
                    console.log(profile)
                    console.log('New User Created: ', newUser)
                    done(null, newUser);
                });
            }
        })
    })
);

// passport.use(
//     new FbStrategy({
//         // options for google strategy
//         clientID: keys.facebook.clientID,
//         clientSecret: keys.facebook.clientSecret,
//         callbackURL: '/auth/facebook/redirect'
//     }, (accessToken, refreshToken, profile, done) => {
//         // passport callback function
//         User.findOne({facebookId: profile.id}).then((currentUser) => {
//             if (currentUser) {
//                 console.log("Current User: ", currentUser);
//                 done(null, currentUser);
//             }
//             else {
//                 new User({
//                     username: profile.displayName,
//                     oauthId: profile.id,
//                     type: 'facebook'
//                 })
//                 .save()
//                 .then((newUser) => {
//                     console.log('New User Created: ', newUser)
//                     done(null, newUser);
//                 });
//             }
//         })
//     })
// );
