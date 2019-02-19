const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

const authCheck = (req, res, next) => {
    if(req.user) {
      res.redirect('/profile');
    }
    else {
      next();
    }
};
  
authRouter.get('/login', authCheck, (req, res) => {
    res.render('login', { title: 'Login | Express OAuth App', user: req.user, page: 'login' });
});

authRouter.get('/signup', authCheck, (req, res) => {
    res.render('signup', { title: 'SignUp | Express OAuth App', user: req.user, page: 'signup' });
});

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Auth with Google
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
});

// Auth with GitHub
authRouter.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}));

// Callback route for GitHub to redirect to
authRouter.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile/');
});

module.exports = authRouter;