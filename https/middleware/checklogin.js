module.exports = function checkLogin(req,res,next){

    if(req.isAuthenticated())
    {
        return res.redirect('/profile')
    }

    return next();

}