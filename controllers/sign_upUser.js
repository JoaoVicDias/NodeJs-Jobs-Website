const User = require('../models/user')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')





exports.getSignupUser = (req,res,next) =>{
    const errors = validationResult(req)
    let email2 = errors.array().find(e => e.param ==='email')? 'invalid' : 'valid'
    let password_2 = errors.array().find(e => e.param ==='password')? 'invalid' : 'valid'
    let password2_2 = errors.array().find(e => e.param ==='password2')? 'invalid' : 'valid'
    
    res.render('sign_upUser',{pageTitle:'Cadastre-se como candidato',email2:email2, password2_2:password2_2,
    password_2:password_2,success_msg:req.flash('success_msg'),error_msg:req.flash('error_msg')})
}

exports.postSign_upUser = (req,res,next) =>{
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2
    const errors = validationResult(req)
    let email2 = errors.array().find(e => e.param ==='email')? 'invalid' : 'valid'
    let password2_2 = errors.array().find(e => e.param ==='password2')? 'invalid' : 'valid'
    let password_2 = errors.array().find(e => e.param ==='password')? 'invalid' : 'valid'
    

    if(!errors.isEmpty()){
        return res.render('sign_upUser',{
            pageTitle:'Cadastre-se como candidato',
            errorMessage: errors.array()[0].msg,
            email2:email2,
            password2_2:password2_2,
            password_2:password_2

        })
    }

    User.findOne({email:email}).then((user)=>{
        if(user){
            email2 = 'invalid'
            req.flash('error_msg','E-mail já está sendo usado!')
            return res.render('sign_upUser',{pageTitle:'Cadastre-se como candidato',email2:email2, password2_2:password2_2,
            password_2:password_2,success_msg:req.flash('success_msg'),error_msg:req.flash('error_msg')})
        }
        if(password != password2){
            password2_2  = 'invalid'
            password_2  = 'invalid'
            req.flash('error_msg','Senhas tem que ser iguais!')
            return res.render('sign_upUser',{pageTitle:'Cadastre-se como candidato',email2:email2, password2_2:password2_2,
            password_2:password_2,success_msg:req.flash('success_msg'),error_msg:req.flash('error_msg')})
        }
        bcrypt.hash(password,12).then((newPassword)=>{
            const user = new User({
                email:email,
                password:newPassword,
                name:'Eu'
            })
            user.save().then(()=>{
                req.flash('success_msg','Você foi cadastrado com sucesso!')
                res.redirect('/users/sign_in')
            })
        }).catch((err)=>{
            console.log(err)
        })
    })

}