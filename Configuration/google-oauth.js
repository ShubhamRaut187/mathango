const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const {Usermodel} = require('../Models/User.model')

require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    // const user = new Usermodel({
    //     googleId:profile.id,
    //     name:profile._json.name,
    //     email:profile._json.email,
    //     avatar:profile._json.picture,
    //     recentlyVisitedBoards:[]
    // })
    try {
        let user = await Usermodel.findOne({googleId:profile.id});
        if(user){
            console.log('User present');
        }
        else{
            user = new Usermodel({
                googleId:profile.id,
                name:profile._json.name,
                email:profile._json.email,
                avatar:profile._json.picture,
                recentlyVisitedBoards:[]
            });
        }
        await user.save();
        cb(null,user);
    } catch (error) {
        cb(error,null);
    }

    console.log(profile);
  }
));

module.exports = {
    passport
}