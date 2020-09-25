module.exports = (req,res,next)=>{
    
    if(req.session.company){
        res.redirect('/')
    }
    next()
}