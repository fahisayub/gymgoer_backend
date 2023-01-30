const passport = require('passport');
const { UserModel } = require('../models/user.model');

let GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4500/auth/google/callback'
}, (accesstoken, refreshtoken, profile, callback) => {

    
    UserModel.findOne({ googleId: profile.id }, async(err, user) => {
        console.log(profile._json)
        let newuser=profile._json
        await UserModel.insertMany[{newuser}]
        return callback(null, 'user');
    })

}))
module.exports=passport;