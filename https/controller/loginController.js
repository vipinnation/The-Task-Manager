function loginController(){

    return{

        loginGet(req,res){
            console.log("login controller");
            res.render('login')
        }
    }
}

module.exports= loginController;