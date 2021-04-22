const express = require('express');


const app = express();
const ejs = require('ejs');
const path= require('path');
const web = require('./Routes/web')
const mongoose = require('mongoose');
const session = require("express-session")
const flash = require('express-flash')


// SETTIGN UP MONGOOSE
mongoose.connect('mongodb+srv://vipinnation:vipin1998@cluster0.bhnrb.mongodb.net/taskManager?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true , useCreateIndex:true , useFindAndModify:true})
.then(()=>console.log("DataBase Connected"))
.catch(()=> console.log("Database Not Connected"))



// SETTING UP FLASH
app.use(flash());
// app.use(function(req,res,next){
//     res.locals.success_message= req.flash('success_message');
//     res.locals.error_message = req.flash('error_message');
//     res.locals.error = req.flash('error');
//     next();
// })



//  SETTING SESSION
app.use(session({
    secret:"mysecret",
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:24*60*60}
    
})) 




// SETTING PASSPORT AUTHENTICATION
const passport =  require('passport');
app.use(passport.initialize());
app.use(passport.session());
const passportInit = require('./https/config/passportAuth');
passportInit(passport);


// SETTING TEMPLETE
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))


// IMPORTING WEB ROUTERS
web(app);



app.listen(3000,()=> console.log("server running"));