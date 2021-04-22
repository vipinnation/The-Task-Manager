const user = require('../Models/user')
const bcrypt = require('bcryptjs');

function signupController()
{
    return{
        signupGet(req,res){
            console.log("signup controller"); 
            res.render('signup') 
        },

        // SIGNUP POST METHOD
        signupPost(req,res){

            const {username,password, confirmPassword} = req.body
             
            
            if(password != confirmPassword){
                console.log("password incoorect")
                req.flash('error', "Password Mismatch");
                return res.render('signup')
            }

            else{
                if(password.length >6){

                    user.findOne({username:username},(err,data)=>{
                        if(err) throw err;

                        if(data){
                            console.log("User Already Registered")
                            req.flash('error','User Already Registered')
                            return res.redirect('/signup')
                        }

                        else{

                            const hashPassword = bcrypt.hashSync(password,10);
                            const addUser =new user({
                                username:username,
                                password:hashPassword
                            })

                            addUser.save().then((info)=>{
                                req.flash('error',"User Registered Successfully")
                                 return res.redirect("/signup",{'msg':'User Registered Successfully'})
                            }).catch(err=>{
                                console.log("Something went wrong")
                                console.log(err) 
                                req.flash('error', "Something Went Worng")
                                return res.redirect("/signup",{'msg':"Something went wrong"})
                            })
                        }
                    })



                }
                else{
                     
                    req.flash('error',"Password must be of 6 digit")
                    console.log("password must be 6 digit")
                    return res.render('signup')
                }
            }



        }
    }
}


module.exports= signupController;