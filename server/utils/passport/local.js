const LocalStrategy = require('passport-local').Strategy;

const users = require('../../models/user.js');

module.exports = new LocalStrategy({
    usernameField : 'uid',
    passwordField : 'password',
    passReqToCallback : true
    },
    
    function(req, userid, password, done){
        if(!userid || !password) return done(null, false);
        console.log("Try to sign in");
        users.findOne({'uid':userid})/*, function(err, user){
            if(err) return done(err);
            if(!user){ 
                console.log("fail to sign in"); 
                done(null, false); 
            }
            return done(null, user);

        }); function(err){
            if(err) return res.status(500).send({error: 'database failure'});
           */
           .then(result => {
            if(!result){ console.log("fail to sign in"); done(null, false); }
            else{
                if(result.password == password){
                    done(null,{
                        uid : result.uid,
                        status : result.status
                        }
                    );
                    //console.log(uid);
                    //console.log(status);
                }else{done(null, false);}
            }
        })
        .catch((err) =>{
            console.error(err);
        });
        
    }
);

