const Job  = require('../models/job')
exports.getIndex = (req,res,next) => {
    Job.find().limit(3).populate('companyId').lean().then((job)=>{
        res.render('index',{
            pageTitle:'ProgramaThor - Developer jobs',
            job:job
        })
    })
    
}