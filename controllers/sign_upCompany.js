const Company = require('../models/company')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')



exports.getSign_upCompany = (req,res,next)=>{
    const errors = validationResult(req)
    let email2 = errors.array().find(e => e.param === 'email')? 'invalid':'valid'
    let password_2 = errors.array().find(e => e.param === 'password')? 'invalid':'valid'
    let password2_2 = errors.array().find(e => e.param === 'password2')? 'invalid':'valid'
    
    res.render('sign_upCompany',{pageTitle:'Cadastre-se como empresa',email2:email2,password_2:password_2,password2_2:password2_2})
}




exports.postSign_upCompany = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2
    const errors = validationResult(req)
    let email2 = errors.array().find(e => e.param === 'email')? 'invalid':'valid'
    let password_2 = errors.array().find(e => e.param === 'password')? 'invalid':'valid'
    let password2_2 = errors.array().find(e => e.param === 'password2')? 'invalid':'valid'


    if(!errors.isEmpty()){
        return res.render('sign_upCompany',{pageTitle:'Cadastre-se como empresa',errorMessage:errors.array()[0].msg,email2:email2,password_2:password_2,password2_2:password2_2})
    }

    Company.findOne({email:email}).then((account)=>{
        if(account){
            email2 = 'invalid'
            req.flash('error_msg','E-mail já está sendo usado!')
            return res.render('sign_upCompany',{pageTitle:'Cadastre-se como empresa',success_msg:req.flash('success_msg'),error_msg:req.flash('error_msg'),email2:email2,password_2:password_2,password2_2:password2_2})
        }
        if(password != password2){
            password_2 = 'invalid'
            password2_2 = 'invalid'
            req.flash('error_msg','Senhas tem que ser iguais!')
            return res.render('sign_upCompany',{pageTitle:'Cadastre-se como empresa',success_msg:req.flash('success_msg'),error_msg:req.flash('error_msg'),email2:email2,password_2:password_2,password2_2:password2_2})
        }
         bcrypt.hash(password,12).then((newPassword)=>{
            const company = new Company({
                email:email,
                password:newPassword,
                name: 'Eu'
            })
            company.save().then(()=>{
                req.flash('success_msg','Você foi cadastrado com sucesso!')
                res.redirect('/companies/sign_in')
            })
        })
    })
}