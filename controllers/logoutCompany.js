exports.getLogout = (req,res,next)=>{
    req.session.destroy()
    res.redirect('/companies/sign_in')
}