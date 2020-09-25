const applyUser = require('../models/applyUser')
const Job = require('../models/job')
const itens_per_page = 4;


exports.getJob = (req,res,next)=>{
    const id = req.params.id
    Job.findById(id).populate('companyId').lean().then((job)=>{
        if(req.session.user){
            applyUser.findOne({ jobId:id,userId:req.session.user._id}).then((doMatch)=>{       
                if(doMatch){
                             res.render('job',{
                                pageTitle:'Vaga',   
                                job:job,
                                applyed: true
                            }) 
                        }else{
                             res.render('job',{
                                pageTitle:'Vaga',   
                                job:job,
                                applyed: false
                            }) 
                        }
            })
        }else{
             res.render('job',{
                    pageTitle:'Vaga',
                    job:job,
                    applyed:false
                }) 
        }   
    })
}

exports.postJob = (req,res,next)=>{
    const userId = req.body.userId
    const id  = req.params.id

    Job.findById(id).populate('companyId').then((job)=>{
        let title = job.title
        let name = job.companyId.name
        let city = job.companyId.city
        let type = job.companyId.type
        let salary = job.salary
        let newjob = null
        return newjob = new applyUser({
            title:title,
            name:name,
            city:city,
            type:type,
            salary:salary,
            userId:userId,
            jobId:id
        }).save().then(()=>{
            res.redirect('/users/perfil/?page=1')
        })
    })
}
exports.getIndexJob = (req,res,next)=>{
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
    Job.find().countDocuments().then((new_job)=>{
        totalItems = new_job;
         currentPage = page
         hasNextPage = itens_per_page * page < totalItems
         hasPreviousPage = page > 1
         nextPage = page + 1
         lastPage = Math.ceil(totalItems/itens_per_page)
            ask1 = currentPage !== 1 ? true : false
         ask2 = hasNextPage 
         ask3 = lastPage !== currentPage && nextPage !== lastPage ? true : false
        return Job.find().skip((page-1) * itens_per_page).limit(itens_per_page).populate('companyId').lean()
    }).then((job)=>{
          
        res.render('indexJob',{
                pageTitle:'Vagas para Programadores e Desenvolvedores',
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

exports.postTitleSearch = (req,res,next)=>{
    const title = req.body.title
    Job.find({title:title}).populate('companyId').lean().then((job)=>{
        res.render('indexJob',{
            pageTitle:'Vagas para Programadores e Desenvolvedores',
            vaga:job
        })
    })
}
