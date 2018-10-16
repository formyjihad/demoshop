let GoogleStrategy = require( 'passport-google-oauth20' ).Strategy
const {SS_ID, SS_KEY, SS_URL} = require('../../../config/constants')
const users = require('../../models/user')

module.exports = new GoogleStrategy({
    clientID: SS_ID,
    clientSecret: SS_KEY,
    callbackURL: SS_URL
}, function(accessToken, refreshToken, profile, done) {
    try{
        user = profile
        //const nickname = profile.displayName;
        //const profileImageUrl = profile.photos[0].value;

        onLoginSuccess('Google', user, done);
    }catch(err){
        console.error(err)
    }
});

async function onLoginSuccess(platformName, user, done) {
    let userModel = new users();
    userModel.platformName = platformName;
    userModel.uid = user.id;
    userModel.status = 1;
    userModel.password = user.id;   //수정 필요.
    try{
        let userData = await users.findOne({"uid":user.id})
        if(!userData){
            let saveData = await userModel.save()
            return done(null, saveData)
        }else{
            return done(null, userData);
        }
    }catch(err){
        console.error(err);

    }
    

};
