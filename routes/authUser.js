const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const sign_upUserRouter = require('../controllers/sign_upUser')
const sign_inUserRouter = require('../controllers/sign_inUser')
const edit_perfil = require('../controllers/edit-perfilUser')
const logout = require('../controllers/logoutUser')
const perfil = require('../controllers/perfilUser')
const isAuth = require('../middleware/is-auth')
const isNotAuth = require('../middleware/is-not-auth')
const isAuthCompany = require('../middleware/authCompany')
const isNotUser = require('../middleware/isNotUser')
const job = require('../controllers/job')







//Routes
router.get('/sign_up',isAuth,sign_upUserRouter.getSignupUser)
router.get('/sign_in',isAuth,sign_inUserRouter.getSign_inUser)
router.get('/edit',isNotAuth,isAuthCompany,edit_perfil.getEditPerfilUser)
router.get('/perfil',isNotAuth,isAuthCompany,perfil.getPerfilUser)
router.get('/logout',logout.getLogout)

router.post('/delete',perfil.postDelete)
router.post('/job/:id',isNotUser,job.postJob)
router.post('/edit',check('name',"Nome Inválido!").isLength({min:2}).trim(),check('lastname',"Sobrenome inválido!").isLength({min:2}).trim(),check('city',"Cidade inválida!").isLength({min:2}).trim(),check('linkedinurl','URL inválida!').isURL().trim(),check('githuburl',"URL inválida!").isURL().trim(),check('skill',"Habilidades inválidas!").isLength({min:2}).trim(),edit_perfil.postEditPerfilUser)
router.post('/sign_up',check('email').isEmail().normalizeEmail().withMessage('Email inválido!'),check('password','Senha inválida!').isAlphanumeric().isLength({min:6}).withMessage('Senha inválida!').trim(),check('password2').isAlphanumeric().isLength({min:6}).trim(),sign_upUserRouter.postSign_upUser)
router.post('/sign_in',check('email').isEmail().normalizeEmail().withMessage('Email inválido!'),check('password',"Senha incorreta!").isAlphanumeric().isLength({min:6}).trim().withMessage('Senha inválida!'),sign_inUserRouter.postSign_inUser)







module.exports = router