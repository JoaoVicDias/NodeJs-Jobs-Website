const itens_per_page = 4
const Job = require('../models/job')
const {validationResult} = require('express-validator')
const applyUser = require('../models/applyUser')
const company = require('../models/company')


exports.getPerfilCompany = (req,res,next) =>{
    let page = +req.query.page
    let totalItems
    let currentPage
    let hasNextPage
    let hasPreviousPage
    let nextPage
    let lastPage
    let ask1
    let ask2
    let ask3
    const id = req.session.company._id
    Job.find({companyId:id}).countDocuments().then((new_job)=>{
        totalItems = new_job;
         currentPage = page
         hasNextPage = itens_per_page * page  < totalItems
         hasPreviousPage = page > 1
         nextPage = page + 1
         lastPage = Math.ceil(totalItems/itens_per_page)
        ask1 = currentPage !== 1 ? true : false
         ask2 = hasNextPage 
         ask3 = lastPage !== currentPage && nextPage !== lastPage ? true : false
        return Job.find({companyId:req.session.company._id}).skip((page-1) * itens_per_page).limit(itens_per_page).populate('companyId').lean()
    }).then((job)=>{
        res.render('perfilCompany',{
                pageTitle:'Meu perfil',
                vaga:job,
                currentPage:currentPage,
                nextPage:nextPage,
                lastPage:lastPage,
                ask1:ask1,
                ask2:ask2,
                ask3:ask3,
            })
        })
    
}
exports.postDelete = (req,res,next)=>{
    const id = req.body.id
    Job.findByIdAndDelete(id).then(()=>{
        res.redirect('/companies/perfil/?page=1')
    })
}


exports.getEdit = (req,res,next)=>{
    const errors = validationResult(req)
    let title2 = errors.array().find(e => e.param ==='title')? 'invalid':'valid'
    let salary2 = errors.array().find(e => e.param ==='salary')? 'invalid':'valid'
    const title = req.body.title
    const salary = req.body.salary
    const description = req.body.description
    Job.findById(req.params.id).lean().then((job)=>{
        res.render('editJob',{
            pageTitle:'Editar uma vaga',
            title2:title2,
            salary2:salary2,
            job:job
        })
    })
}


exports.postEdit = (req,res,next)=>{
    const errors = validationResult(req)
    const title = req.body.title
    const salary = req.body.salary
    const description = req.body.description
    const id = req.body._id
    let title2 = errors.array().find(e=>e.param==='title')?'invalid':'valid'
    let salary2 = errors.array().find(e=>e.param==='salary')?'invalid':'valid'
    if(!errors.isEmpty()){
        res.render('editJob',{
            pageTitle:'Editar uma vaga',
            title2:title2,
            salary2:salary2,
            errorMessage:errors.array()[0].msg
        })
    }
    console.log(id)
    Job.findById(id).then((job)=>{
        job.update({
                title:title,
                salary:salary,
                description:description
            }).then(()=>{
                res.redirect('/companies/perfil/?page=1')
            }).catch((err)=>{
            console.log(err)
    })
        
    }).catch((err)=>{
        console.log(err)
    })
    
    

}


exports.getJobUsers = (req,res,next)=>{
    const id = req.params.id
    let page = +req.query.page
    let totalItems
    let currentPage
    let hasNextPage
    let hasPreviousPage
    let nextPage
    let lastPage
    let ask1
    let ask2
    let ask3
    applyUser.find({jobId:id}).countDocuments().then((new_job)=>{
        totalItems = new_job;
        currentPage = page
         hasNextPage = itens_per_page * page  < totalItems
         hasPreviousPage = page > 1
         nextPage = page + 1
         lastPage = Math.ceil(totalItems/itens_per_page)
        ask1 = currentPage !== 1 ? true : false
         ask2 = hasNextPage 
         ask3 = lastPage !== currentPage && nextPage !== lastPage ? true : false
         
         return applyUser.find({jobId:id}).skip((page-1) * itens_per_page).limit(itens_per_page).populate('userId').lean()
    }).then((user)=>{
        res.render('jobUsers',{
            pageTitle:'Usuarios cadastrados',
            vaga:user,
            currentPage:currentPage,
            nextPage:nextPage,
            lastPage:lastPage,
            ask1:ask1,
            ask2:ask2,
            ask3:ask3,
        })
    })
    
}


