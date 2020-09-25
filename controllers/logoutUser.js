
exports.getLogout = (req,res,next)=>{
    req.session.destroy()
    res.redirect('/users/sign_in')
}