const {validationResult} = require('express-validator')
const Job = require('../models/job')
const company = require('../models/company')

exports.getCreateJob = (req,res,next)=>{
    const errors = validationResult(req)
    let title2 = errors.array().find(e => e.param ==='title')? 'invalid':'valid'
    let salary2 = errors.array().find(e => e.param ==='salary')? 'invalid':'valid'
    res.render('createJob',{
        pageTitle:'Criar uma nova vaga',
        title2:title2,
        salary2:salary2
    })
}

exports.postCreateJob = (req,res,next)=>{
    const errors = validationResult(req)
    const title = req.body.title
    const salary = req.body.salary
    const description = req.body.description
    let title2 = errors.array().find(e=>e.param==='title')?'invalid':'valid'
    let salary2 = errors.array().find(e=>e.param==='salary')?'invalid':'valid'
    if(!errors.isEmpty()){
        res.render('createJob',{
            pageTitle:'Criar uma nova vaga',
            title2:title2,
            salary2:salary2,
            errorMessage:errors.array()[0].msg
        })
    }
    const job = new Job({
        title:title,
        salary:salary,
        description:description,
        companyId:req.session.company
    })
    company.update({
        jobId: job._id
    })
    job.save().then(()=>{
        res.redirect('/companies/perfil/?page=1')
    }).catch((err)=>{
        console.log(err)
    })

}