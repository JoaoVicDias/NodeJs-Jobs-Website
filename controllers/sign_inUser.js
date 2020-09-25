const User = require('../models/user')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const user = require('../models/user')
const session = require('express-session')


exports.getSign_inUser = (req,res,next)=>{
    const errors = validationResult(req)
    let email2 = errors.array().find(e => e.param === 'email')? 'invalid' : 'valid'
    let password_2 = errors.array().find(e => e.param === 'password')? 'invalid' : 'valid'
    res.render('sign_inUser',{pageTitle:'Login como candidato',email2:email2,password_2:password_2,success_msg:req.flash('success_msg'),error_msg:req.flash('error_msg')})
}

exports.postSign_inUser = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const errors = validationResult(req)
    let email2 = errors.array().find(e => e.param === 'email')? 'invalid' : 'valid'
    let password_2 = errors.array().find(e => e.param === 'password')? 'invalid' : 'valid'

    if(!errors.isEmpty()){
        return  res.render('sign_inUser',{pageTitle:'Login como candidato',errorMessage:errors.array()[0].msg,email2:email2,password_2:password_2})
    }
     User.findOne({email:email}).then((account)=>{
        if(!account){
            email2 = 'invalid'
            req.flash('error_msg','E-mail não cadastrado!')
            return res.render('sign_inUser',{pageTitle:'Login como candidato',email2:email2,password_2:password_2,error_msg:req.flash('error_msg')})
        }
        bcrypt.compare(password, account.password).then((doMatch)=>{
            if(doMatch){
                req.session.user = account
                req.session.isLoggedIn = true
                return req.session.save(err =>{
                    if(account.name === 'Eu'){
                        res.redirect('/users/edit')
                    }else{
                        res.redirect('/')
                    }
                })
            }else{
                password_2 = 'invalid'
                req.flash('error_msg','Senha incorreta!')
                return res.render('sign_inUser',{pageTitle:'Login como candidato',password_2:password_2,email2:email2,error_msg:req.flash('error_msg')})
            
            }
        })

    }).catch((err)=>{
        console.log(err)
    })

}