const applyUser = require('../models/applyUser')
let itens_per_page = 4

exports.getPerfilUser = (req,res,next)=>{
    const userId = req.session.user._id
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
    applyUser.find({userId:userId}).countDocuments().then((new_job)=>{
        totalItems = new_job;
         currentPage = page
         hasNextPage = itens_per_page * page  < totalItems
         hasPreviousPage = page > 1
         nextPage = page + 1
         lastPage = Math.ceil(totalItems/itens_per_page)
            ask1 = currentPage !== 1 ? true : false
         ask2 = hasNextPage 
         ask3 = lastPage !== currentPage && nextPage !== lastPage ? true : false
        return applyUser.find({userId:userId}).skip((page-1) * itens_per_page).limit(itens_per_page).lean()
    }).then((job)=>{
        res.render('perfilUser',{
                pageTitle:'Meu perfil',
                job:job,
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
    applyUser.findOneAndDelete({jobId:id}).then(()=>{
        res.redirect('/users/perfil/?page=1')
    })
}




