module.exports = (req,res,next) =>{
    if(!req.session.isLoggedIn){
        res.redirect('/users/sign_in')
    }
    next()
}