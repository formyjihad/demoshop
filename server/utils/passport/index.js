const passport = require('passport');
const local = require('./local');
const google = require('./google')
const jwt = require('./jwt');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

passport.use(local);
passport.use(jwt);
passport.use(google);
module.exports = passport;