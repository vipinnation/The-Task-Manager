 
 function homeController(){

    return {

        index(req,res){
           console.log("home controller")
            res.render("index")
        }
    }
 }


 module.exports = homeController;