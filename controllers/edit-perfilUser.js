const User = require('../models/user')
const {validationResult} = require('express-validator')



exports.getEditPerfilUser = (req,res,next) =>{
    const name = req.body.name
    const lastname = req.body.lastname
    const city = req.body.city
    const linkedinurl = req.body.linkedinurl
    const githuburl = req.body.githuburl 
    const skill = req.body.skill
    const errors = validationResult(req)
    let name2 = errors.array().find(e=>e.param === "name")? 'invalid':'valid'
    let lastname2 = errors.array().find(e=>e.param === "lastname")? 'invalid':'valid'
    let city2 = errors.array().find(e=>e.param === "city")? 'invalid':'valid'
    let linkedinurl2 = errors.array().find(e=>e.param === "linkedinurl")? 'invalid':'valid'
    let githuburl2 = errors.array().find(e=>e.param === "githuburl")? 'invalid':'valid'



    res.render('edit-perfilUser',{
        pageTitle:'Editar meu perfil',
        name:name,
        lastname:lastname,
        city:city,
        linkedinurl:linkedinurl,
        githuburl:githuburl,
        skill:skill,
        name2:name2,
        lastname2:lastname2,
        city2:city2,
        linkedinurl2:linkedinurl2,
        githuburl2:githuburl2
    })
}

exports.postEditPerfilUser = (req,res,next) =>{
    const name = req.body.name
    const lastname = req.body.lastname
    const city = req.body.city
    const linkedinurl = req.body.linkedinurl
    const githuburl = req.body.githuburl 
    const skill = req.body.skill
    const errors = validationResult(req)
    const id = req.body._id
    let name2 = errors.array().find(e=>e.param === "name")? 'invalid':'valid'
    let lastname2 = errors.array().find(e=>e.param === "lastname")? 'invalid':'valid'
    let city2 = errors.array().find(e=>e.param === "city")? 'invalid':'valid'
    let linkedinurl2 = errors.array().find(e=>e.param === "linkedinurl")? 'invalid':'valid'
    let githuburl2 = errors.array().find(e=>e.param === "githuburl")? 'invalid':'valid'


    if(!errors.isEmpty()){
        return res.render('edit-perfilUser',{
            pageTitle:'Editar meu perfil',
            name:name,
            lastname:lastname,
            city:city,
            linkedinurl:linkedinurl,
            githuburl:githuburl,
            skill:skill,
            errorMessage: errors.array()[0].msg,
            name2:name2,
            lastname2:lastname2,
            city2:city2,
            linkedinurl2:linkedinurl2,
            githuburl2:githuburl2
        })
    }


    User.findById(id).then((account)=>{
        if(!account){
            res.redirect('/users/sign_in')
        }
         account.updateOne({
            name:name,
            lastname:lastname,
            city:city,
            linkedinurl:linkedinurl,
            githuburl:githuburl,
            skill:skill
        }).then(()=>{
            res.redirect('/')
        })
    })



}