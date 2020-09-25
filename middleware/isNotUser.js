const session = require("express-session")

module.exports = (req,res,next)=>{
    if(!req.session.user){
        req.session.destroy()
        res.redirect('/users/sign_in')
    }
    next()
}