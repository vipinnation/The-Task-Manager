var homeController = require('../https/controller/homeController')
var loginController = require("../https/controller/loginController")
var signupController = require("../https/controller/signupController")
const passport = require('passport')
const userProfileController = require('../https/controller/userProfileController')
const checklogin = require('../https/middleware/checklogin')
const checkAuth =require('../https/middleware/checkAuth');

module.exports = function web(app){
     // INDEX CONTROLLER
     app.get('/',checklogin, homeController().index)

     // LOGIN CONTROLLER
     app.get('/login',checklogin,loginController().loginGet)
     app.post('/login',passport.authenticate('local',{
          failureRedirect:'/login',
          successRedirect:'/profile',
          failureFlash:true
     }))


     // SIGNUP CONTROLLER
     app.get('/signup',checklogin,signupController().signupGet)
     app.post('/signup',signupController().signupPost)


     //PROFILE CONTROLLER
     app.get('/profile',checkAuth,userProfileController().dashboard)


     // TASK CONTROLLER
     app.post('/addtask',checkAuth,userProfileController().addtask)
     app.get('/done/:id', checkAuth,userProfileController().doneTask)


     //LOGOUT CONTROLLER
     app.get('/logout',(req,res)=>{
          req.logout();
          console.log('logout successfully')
          req.flash('error','Logout Successfully')
          return res.redirect('/login')
     })

}