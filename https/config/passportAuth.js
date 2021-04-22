const passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const bcrypt  = require('bcryptjs');
const user = require('../Models/user')


module.exports = function init(passport){

    passport.use(new localStrategy({usernameField:'username'},checkAuthenicate));

    function checkAuthenicate(username,password,done){

        user.findOne({username:username},(err,data)=>{
            if(err) throw err;

            if(!data){
                console.log("User Not Found");
                return done(null,false,{'message':'User Not Found'});
            }
            if(data){
                if(bcrypt.compareSync(password,data.password)){
                    console.log("Password Matched");
                    return done(null,data,)
                }

                else{
                    console.log("password incorrect");
                    return done(null,false,{'message':'Password Incorrect'})
                }
            }
        })
    }


    passport.serializeUser((user,cb)=>{
        return cb(null, user._id)
    });

    passport.deserializeUser((id,cb)=>{
        
         user.findById(id,(err,data)=>{
             return cb(null,data);
         })
    })

}


