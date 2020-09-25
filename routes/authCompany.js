const express = require('express')
const router = express.Router()
const sign_upCompanyRouter = require('../controllers/sign_upCompany')
const sign_inCompanyRouter = require('../controllers/sign_inCompany')
const editPerfilCompany = require('../controllers/edit-perfilCompany')
const perfilCompany = require('../controllers/perfilCompany')
const logout = require('../controllers/logoutCompany')
const createJob  = require('../controllers/createJob')
const isAuth = require('../middleware/is-auth')
const isNotAuth = require('../middleware/is-not-auth')
const isAuthUser = require('../middleware/authUser')
const {check} = require('express-validator')

//Routes
router.get('/sign_up',isAuth,sign_upCompanyRouter.getSign_upCompany)
router.get('/sign_in',isAuth,sign_inCompanyRouter.getSign_inCompany)
router.get('/edit',isNotAuth,isAuthUser,editPerfilCompany.getEditPerfilCompany)
router.get('/perfil',isNotAuth,isAuthUser,perfilCompany.getPerfilCompany)
router.get('/Createjob',isNotAuth,isAuthUser,createJob.getCreateJob)
router.get('/logout',logout.getLogout)
router.get('/editJob/:id',isAuthUser,isNotAuth,perfilCompany.getEdit)
router.get('/job/users/:id',isNotAuth,isAuthUser,perfilCompany.getJobUsers)


router.post('/delete',perfilCompany.postDelete)
router.post('/editJob',check('title',"Titulo Inválido!").isLength({min:2}).trim(),check('salary',"Salário Inválida!"),check('description',"Descrição Inválida!").isLength({min:2}).trim(),perfilCompany.postEdit)
router.post('/Createjob',check('title',"Titulo Inválido!").isLength({min:2}).trim(),check('salary',"Salário Inválida!"),check('description',"Descrição Inválida!").isLength({min:2}).trim(),createJob.postCreateJob)
router.post('/edit',check('name',"Nome Inválido!").isLength({min:2}).trim(),check('city',"Cidade Inválida!").trim().isLength({min:2}),check('description',"Descrição Inválida!").isLength({min:2}).trim(),check('type',"Tipo Inválido!").isLength({max:1}).trim(),editPerfilCompany.postEditPerfilCompany)
router.post('/sign_up',isAuth,check('email').isEmail().normalizeEmail().withMessage('Email inválido!'),check('password','Senha inválida!').isAlphanumeric().isLength({min:6}).trim().withMessage('Senha inválida!'),check('password2').isAlphanumeric().isLength({min:6}).trim(),sign_upCompanyRouter.postSign_upCompany)
router.post('/sign_in',isAuth,check('email').isEmail().normalizeEmail().withMessage('Email inválido!'),check('password').isAlphanumeric().isLength({min:6}).trim().withMessage('Senha inválida!'),sign_inCompanyRouter.postSign_inCompany)




module.exports = router
