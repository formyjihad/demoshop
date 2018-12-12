const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')
const {Secret_key} = require('../../../config/jwt')

const users = require('../../models/user.js');

module.exports = new LocalStrategy({
    usernameField : 'uid',
    passwordField : 'password',
    passReqToCallback : true
    },
    
    async function(req, userid, password, done){
        if(!userid || !password) return done(null, false);
        //console.log("Try to sign in");
        let loginData = await users.findOne({'uid':userid})/*, function(err, user){
            if(err) return done(err);
            if(!user){ 
                //console.log("fail to sign in"); 
                done(null, false); 
            }
            return done(null, user);

        }); function(err){
            if(err) return res.status(500).send({error: 'database failure'});
           */
          
        try
        {
            if(loginData.password == password){
                //console.log(Secret_key)
                const accessToken = jwt.sign({id:userid, status:loginData.status}, Secret_key ,{expiresIn:'1d'});
                return done(null, {
                    uid:loginData.uid,
                    status:loginData.status,
                    access_token:accessToken
                })
            }
            else{
                return done(null, false);
            }
        }
        catch(err){
            //console.log("fail to sign in"); 
            console.error(err);
            return done(null, false)
            
        };
        
    }
);

