// Load express module
const express = require('express');
// Initialize app
const app = express();
// Initialize port
const port = process.env.PORT || 5000;
// Initialize paths
const path = require('path');
// Initialize CORS middleware
const cors = require('cors');
// Initialize Body Parser
const bodyParser = require('body-parser');
// Initialize Cookie Parser
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
// Initializa Passport
const passport = require('passport');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initialize public directory
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose connection
const mongoose = require('mongoose');
const keys = require('./config/credentials');
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("Connected to oauth_db")
});

// Setup Cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req, res) => {
    res.render('login', { title: 'Login | Express OAuth App', user: req.user, page: 'home' });
});

// app.get('/login', (req, res) => {
//     res.render('login', { title: 'Login To App', user: req.user});
// });

app.get('/google80b88df8fbd2b89f.html', (req, res) => {
    // res.sendFile(path.join(__dirname+'/index.html'));
    res.sendFile(path.join(__dirname+'/google80b88df8fbd2b89f.html'), { title: 'Login | Express OAuth App', user: req.user, page: 'verify' });
});

// export Routes 
const authRouter = require('./routes/auth-router');
app.use('/auth', authRouter);

const passportSetup = require('./config/passport');

const profileRouter = require('./routes/profile-router');
app.use('/profile', profileRouter);

app.listen(port, () => {
    console.log('server started on port ', port);
})

