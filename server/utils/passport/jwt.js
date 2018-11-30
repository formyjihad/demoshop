let passportJWT = require("passport-jwt");
let JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt;
const users = require('../../models/user')
const jwt = require('jsonwebtoken')
const {Secret_key} = require('../../../config/jwt')

let bodyExtractor = (req)=>{
    //console.log(req.user)
    let token = req.user.access_token
    return token
}

module.exports = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([bodyExtractor]),
    secretOrKey   : Secret_key   //config 에 JWT 암호키 추가 필요
}, async function(jwtPayload, done) {
    try{
        let userId = jwtPayload.id
        console.log("jwtpayload")
        //console.log(jwtPayload)
        let userData = await users.findOne({uid:userId})
        //console.log(userData)
        if(userData.status==0){
            const accessToken = jwt.sign({id:userData.uid, status:userData.status}, Secret_key ,{expiresIn:'1d'});
            console.log(accessToken)
            return done(null, {
                access_token:accessToken
            })
        }
        else{
            return done(null, false);
        }
    }catch(err){
        console.error(err);

    }
});

