const Company = require('../models/company')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const session = require('express-session')
const company = require('../models/company')


exports.getSign_inCompany = (req,res,next)=>{
    const erros = validationResult(req)
    let email2 = erros.array().find(e => e.param === 'email')? 'invalid' : 'valid'
    let password_2 = erros.array().find(e => e.param === 'password')? 'invalid' : 'valid'

    res.render('sign_inCompany',{pageTitle:'Login como empresa',success_msg:req.flash('success_msg'),email2:email2,password_2:password_2})
}

exports.postSign_inCompany = (req,res,next) =>{
    const email  = req.body.email
    const password  = req.body.password
    const erros = validationResult(req)
    let email2 = erros.array().find(e => e.param === 'email')? 'invalid' : 'valid'
    let password_2 = erros.array().find(e => e.param === 'password')? 'invalid' : 'valid'

    if(!erros.isEmpty()){
        return res.render('sign_inCompany',{
            errorMessage:erros.array()[0].msg,
            pageTitle:'Login como empresa',
            email2:email2,
            password_2:password_2
        })
    }

    Company.findOne({email:email}).then((account)=>{
        if(!account){
            email2 = 'invalid'
            req.flash('error_msg','E-mail não cadastrado!')
            return res.render('sign_inCompany',{pageTitle:'Login como empresa',error_msg:req.flash('error_msg'),email2:email2,password_2:password_2})
        }
         bcrypt.compare(password, account.password).then((doMatch)=>{
            if(doMatch){
                req.session.company = account
                req.session.isLoggedIn = true
                return req.session.save(err =>{
                    if(account.name ==='Eu'){
                        res.redirect('/companies/edit')
                    }else{
                        res.redirect('/')
                    }
                })
            }else{
                password_2 = 'invalid'
                req.flash('error_msg','Senha incorreta!')
                return res.render('sign_inCompany',{pageTitle:'Login como empresa',error_msg:req.flash('error_msg'),email2:email2,password_2:password_2})
            }
        })
    })


}