const {validationResult} = require('express-validator')
const Company = require('../models/company')


 exports.getEditPerfilCompany = (req,res,next)=>{
    const errors = validationResult(req)
    const name = req.body.name
    const city = req.body.city
    const description = req.body.description
    const type = req.body.type
    let name2 = errors.array().find(e => e.param ==='name')? 'invalid':'valid'
    let city2 = errors.array().find(e => e.param ==='city')? 'invalid':'valid'
    let type2 = errors.array().find(e => e.param ==='type')? 'invalid':'valid'

    res.render('edit-perfilCompany',{
         pageTitle:'Editar o perfil da minha empresa',
         name:name,
         city:city,
         description:description,
         type:type,
         name2:name2,
         city2:city2,
         type2:type2,
     })
 }

 exports.postEditPerfilCompany = (req,res,next)=>{
    const errors = validationResult(req)
    const name = req.body.name
    const city = req.body.city
    const description = req.body.description
    const type = req.body.type
    const id = req.body._id
    let name2 = errors.array().find(e => e.param ==='name')? 'invalid':'valid'
    let city2 = errors.array().find(e => e.param ==='city')? 'invalid':'valid'
    let type2 = errors.array().find(e => e.param ==='type')? 'invalid':'valid'

    if(!errors.isEmpty()){
        return res.render('edit-perfilCompany',{
            pageTitle:'Editar o perfil da minha empresa',
            name:name,
            city:city,
            description:description,
            type:type,
            name2:name2,
            city2:city2,
            type2:type2,
            errorMessage:errors.array()[0].msg
        })
    }
    Company.findById(id).then((account)=>{
        if(!account){
            res.redirect('/')
        }
       account.updateOne({
        name:name,
        city:city,
        description:description,
        type:type,
       }).then(()=>{
           res.redirect('/')
       }).catch((err)=>{
           console.log(err)
       })
    })


 }