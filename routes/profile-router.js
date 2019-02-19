const express = require('express');
const profileRouter = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
      res.redirect('/login');
    }
    else {
      next();
    }
};

// Callback route for Google to redirect to
profileRouter.get('/', authCheck, (req, res) => {
    res.render('profile', {title: 'Profile', user: req.user, page: 'profile'});
});

module.exports = profileRouter;